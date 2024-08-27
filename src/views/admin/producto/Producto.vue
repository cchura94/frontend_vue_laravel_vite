<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo Producto" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>


            <DataTable
                ref="dt"
                :value="products"
                :lazy="true"
                :loading="loading"
                dataKey="id"
                :totalRecords="totalRecords"
                @page="onPage"
                :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestión Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Buscar..." v-model="buscar" @keypress.enter="busquedaProducto()"/>
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="Cod" sortable style="min-width: 1rem"></Column>
                <Column field="nombre" header="NOMBRE" sortable style="min-width: 12rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <img :src="`http://localhost:8000/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="precio" header="PRECIO" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio) }}
                    </template>
                </Column>
                <Column field="categoria.nombre" header="Categoria" sortable style="min-width: 3rem"></Column>
               
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-image" rounded class="mr-2" @click="editImagen(slotProps.data)" />

                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Productos" :modal="true">
            {{ product }}
            <div class="flex flex-col gap-6">
                <img v-if="product.imagen" :src="`http://127.0.0.1:8000/${product.imagen}`" :alt="product.imagen" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Nombre</label>
                    <InputText id="name" v-model.trim="product.nombre" required="true" autofocus :invalid="submitted && !product.nombre" fluid />
                    <small v-if="submitted && !product.nombre" class="text-red-500">Nombre es Obligatorio.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.descripcion" required="true" rows="3" cols="20" fluid />
                </div>

                <div>
                    <span class="block font-bold mb-4">Categoria</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6" v-for="cat in categorias" :key="cat.id">
                            <RadioButton id="category{{cat.id}}" v-model="product.categoria_id" name="category" :value="cat.id" />
                            <label for="category{{cat.id}}">{{cat.nombre}}</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Precio</label>
                        <InputNumber id="price" v-model="product.precio" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Cantidad</label>
                        <InputNumber id="quantity" v-model="product.cantidad" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>
    </div>


<Dialog v-model:visible="dialogImagen" modal header="Subir Imagen" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Actualizar Imagen.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Seleccione su imagen</label>
        <input type="file" @change="seleccionarImagen($event)">
    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="dialogImagen = false"></Button>
        <Button type="button" label="Subir Imagen" @click="uploadImage()"></Button>
    </div>
</Dialog>

</template>

<script setup>
import productoService from './../../../services/producto.service';
import categoriaService from './../../../services/categoria.service';

import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    getProductos()
    getCategorias()
});

const toast = useToast();
const dt = ref();
const products = ref();
const categorias = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({});
const submitted = ref(false);
const dialogImagen = ref(false)
const producto_id = ref(-1)
const buscar = ref("")

const loading = ref(false)
const totalRecords = ref(0)


const getProductos = async (page=1, limit=10) => {
    loading.value = true;
    const {data} = await productoService.listar(page, limit, buscar.value);
     products.value = data.data
     totalRecords.value = data.total
     loading.value = false;
}

const onPage = (event) => {
    

    getProductos(event.page + 1, event.rows)

    
        
};

const getCategorias = async () => {
    const {data} = await categoriaService.listar();
     categorias.value = data
}

function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function editImagen(prod) {
    dialogImagen.value = true;
    producto_id.value = prod.id
}

async function seleccionarImagen(event){
    console.log(event.target.files[0]);
    product.value.imagen = event.target.files[0];

}

function busquedaProducto(){
    getProductos();
}

async function uploadImage(){
    let formData = new FormData();
    formData.append("imagen", product.value.imagen);

    await productoService.guardarImagen(producto_id.value, formData)

    dialogImagen.value = false
    getProductos()
}

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

async function saveProduct() {
    submitted.value = true;

    if (product?.value.nombre?.trim()) {
        if (product.value.id) {

            const {data} = await productoService.modificar(product.value.id, product.value)
            getProductos()
            
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            
            const {data} = await productoService.guadar(product.value)

            getProductos()


            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
}

function editProduct(prod) {
    product.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

function exportCSV() {
    dt.value.exportCSV();
}



</script>