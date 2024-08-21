<template>
    <div class="card">
        <h1>Categorias</h1>

        <Button label="Nueva Categoria" @click="dialog_visible = true" />

<Dialog v-model:visible="dialog_visible" modal header="Categoria" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Datos de Categoria.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-24">nombre</label>
        <InputText id="nombre" class="flex-auto" autocomplete="off" v-model="categoria.nombre" />
    </div>
    <div class="flex items-center gap-4 mb-8">
        <label for="detalle" class="font-semibold w-24">detalle</label>
        <InputText id="detalle" class="flex-auto" autocomplete="off" v-model="categoria.detalle" />
    </div>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Guardar" @click="funGuardar()"></Button>
    </div>
</Dialog>

        <DataTable :value="categorias" tableStyle="min-width: 50rem">
            <Column field="id" header="COD"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="detalle" header="DETALLE"></Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="funEditar(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger" @click="funEliminar(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import categoriaService from "./../../../services/categoria.service"

const categorias = ref([])
const dialog_visible = ref(false)
const categoria = ref({})

onMounted(() => {
    getCategoria()
})

const getCategoria = async () => {
    try {
        const {data} = await categoriaService.listar()
        categorias.value = data;
        
    } catch (error) {
        alert("Error al recuperar los datos categorias");
    }
}

const funGuardar = async () => {
    try {
        if(categoria.value.id){
            const { data }  = await categoriaService.modificar(categoria.value.id, categoria.value)
    
            dialog_visible.value = false;

            getCategoria();
        }else{

            const { data }  = await categoriaService.guadar(categoria.value)
    
            dialog_visible.value = false;
    
            getCategoria();
        }
        categoria.value = {}
    } catch (error) {
        alert("Error al guardar los datos categoria");

    }
}

const funEditar = async (data) => {
    categoria.value = data;
    dialog_visible.value = true;

}
const funEliminar = async () => {
    categoria.value = data
    if(confirm("Esta seguro de elimninar?")){

    }
}

</script>