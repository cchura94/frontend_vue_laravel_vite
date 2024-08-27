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
        <div v-if="cliente_seleccionado">
          {{ cliente_seleccionado }}
        </div>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-xl mb-4">Pedido</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import productoService from "./../../../services/producto.service";

const carrito = ref([]);
const cliente_seleccionado = ref();
const productos = ref();

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

function quitarCarrito(prod){
    
    carrito.value.splice(carrito.value.indexOf(prod), 1);
}
</script>
