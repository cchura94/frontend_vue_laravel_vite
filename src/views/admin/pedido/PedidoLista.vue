<template>
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl mb-4">Lista Pedidos</h2>
      <DataTable :value="pedidos" tableStyle="min-width: 50rem">
        <Column field="fecha_pedido" header="Fecha Pedido"></Column>
        <Column field="estado" header="Estado"></Column>
        <Column field="cliente.nombre_completo" header="Cliente"></Column>
        <Column field="productos" header="PRODUCTOS">
            <template #body="slotProps">
            <Button
              icon="pi pi-product"
              rounded
              class="mr-2"
              @click="mostrarPedido(slotProps.data)"
            />

          </template>
        </Column>
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


<Dialog v-model:visible="visible_pedido" modal header="Datos Pedidos" :style="{ width: '55rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Datos.</span>
    
    
    <DataTable :value="productos_detalle.productos" tableStyle="min-width: 50rem">
        <Column field="stock" header="Stock"></Column>
        <Column field="precio" header="Precio"></Column>
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
    
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible_pedido = false"></Button>
    </div>
</Dialog>


    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import pedidoService from "../../../services/pedido.service";

const pedidos = ref([])
const visible_pedido = ref(false)
const productos_detalle = ref([])

onMounted(() => {
    getPedidos()
})

const getPedidos = async () => {
    const {data} = await pedidoService.listar()

    pedidos.value = data.data;
}

const mostrarPedido = async (prod) => {
visible_pedido.value = true
productos_detalle.value = prod
}
</script>