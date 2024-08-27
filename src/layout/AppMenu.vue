<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Administrador',
        items: [
            { label: 'Panel', icon: 'pi pi-fw pi-home', to: '/admin' },
            { label: 'Mi Perfil', icon: 'pi pi-fw pi-user', to: '/admin/perfil' }
        ]
    },
    {
        label: 'Gestión Usuarios',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-id-card', to: '/admin/usuario' },
            { label: 'Personas', icon: 'pi pi-fw pi-check-square', to: '/admin/persona' },
            
        ]
    },
    {
        label: 'Gestión',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Categoria',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/categoria'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-pencil',
                to: '/admin/producto'
            }
        ]
    },
    {
        label: 'Ventas',
        icon: 'pi pi-fw pi-briefcase',
        items: [
            {
                label: 'Nuevo Pedido',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/pedido/nuevo'
            },
            {
                label: 'Lista Pedido',
                icon: 'pi pi-fw pi-pencil',
                to: '/admin/pedido'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
