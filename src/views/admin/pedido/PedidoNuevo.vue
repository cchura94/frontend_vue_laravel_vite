<template>
  <div class="flex gap-6">
    <div class="w-3/5 bg-white p-4 rounded shadow">
      <h2 class="text-xl mb-4">Lista de Productos</h2>
      <DataTable :value="productos" tableStyle="min-width: 50rem">
        <Column field="nombre" header="Nombre"></Column>
        <Column field="precio" header="Precio"></Column>
        <Column field="cantidad" header="Stock"></Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column :exportable="false" style="min-width: 6rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-plus"
              rounded
              class="mr-2"
              @click="addCarrito(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <div class="w-2/5 flex flex-col gap-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl mb-4">Carrito</h2>

        <DataTable :value="carrito">
          <Column field="nombre" header="Nombre"></Column>
          <Column field="cantidad" header="Cantidad"></Column>
          <Column field="precio" header="Precio"></Column>
          <Column :exportable="false" style="min-width: 6rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-minus"
                rounded
                class="mr-2"
                @click="quitarCarrito(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl mb-4">Cliente</h2>
        <InputText type="text" v-model="buscar" @keypress.enter="buscarCliente()" />

        <Button label="Nuevo Cliente" @click="visible_cliente = true" />

        <Dialog
          v-model:visible="visible_cliente"
          modal
          header="Datos Cliente"
          :style="{ width: '25rem' }"
        >
          <span class="text-surface-500 dark:text-surface-400 block mb-8"
            >Ingrese datos de Nuevo Cliente.</span
          >
          <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombre Completo</label>
            <InputText id="username" class="flex-auto" autocomplete="off" v-model="cliente.nombre_completo"/>
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="ci_nit" class="font-semibold w-24">ci_nit</label>
            <InputText id="ci_nit" class="flex-auto" autocomplete="off"  v-model="cliente.ci_nit"/>
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="telefono" class="font-semibold w-24">telefono</label>
            <InputText id="telefono" class="flex-auto" autocomplete="off" v-model="cliente.telefono" />
          </div>
          <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Email</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model="cliente.correo" />
          </div>
  
          <div class="flex justify-end gap-2">
            <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              @click="visible_cliente = false"
            ></Button>
            <Button
              type="button"
              label="Guardar"
              @click="guardarCliente()"
            ></Button>
          </div>
        </Dialog>

        <div v-if="cliente_seleccionado">
          <h4>NOMBRE COMPLETO: {{ cliente_seleccionado.nombre_completo }}</h4>
          <h4>CI / NIT: {{ cliente_seleccionado.ci_nit }}</h4>
          <h4>CORREO: {{ cliente_seleccionado.correo }}</h4>
          <h4>TELEFONO: {{ cliente_seleccionado.telefono }}</h4>
          
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl mb-4">Pedido</h2>
        <Button
              type="button"
              label="Guardar Pedido"
              @click="guardarPedido()"
            ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import productoService from "./../../../services/producto.service";
import clienteService from "./../../../services/cliente.service"
import pedidoService from "./../../../services/pedido.service"

const carrito = ref([]);
const cliente_seleccionado = ref();
const productos = ref();
const visible_cliente = ref(false);
const cliente = ref({nombre_completo: "", telefono: "", ci_nit: '', correo: ''})
const buscar = ref("");

onMounted(() => {
  getProductos();
});

async function getProductos() {
  const { data } = await productoService.listar();
  productos.value = data.data;
}

function addCarrito(prod) {
  const producto = {
    id: prod.id,
    nombre: prod.nombre,
    precio: prod.precio,
    cantidad: 1,
  };

  carrito.value.push(producto);
}

async function guardarCliente(){
  const {data} = await clienteService.guadar(cliente.value)
  cliente_seleccionado.value = data
  cliente.value = {}
  visible_cliente.value = false
}

async function buscarCliente(){
  const {data} = await clienteService.buscar(buscar.value)
  cliente_seleccionado.value = data
}

function quitarCarrito(prod) {
  carrito.value.splice(carrito.value.indexOf(prod), 1);
}

async function guardarPedido(){

  let datos = {
    cliente_id: cliente_seleccionado.value.id,
    productos: carrito.value,
    estado: 1
  }

  const { data } = await pedidoService.guadar(datos)

  carrito.value = []
  cliente_seleccionado = {}

}
</script>
