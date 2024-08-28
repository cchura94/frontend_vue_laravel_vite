import { createRouter, createWebHistory } from 'vue-router'

import Inicio from "./../views/web/Inicio.vue"
import Servicio from "./../views/web/Servicios.vue"
import Login from "./../views/auth/Login.vue"
import Perfil from '../views/admin/perfil/Perfil.vue'
import Usuario from '../views/admin/usuario/Usuario.vue'
import Persona from '../views/admin/usuario/Persona.vue'
import NotFound from '../views/errors/NotFound.vue'
import Categoria from '../views/admin/categoria/Categoria.vue'
import Producto from '../views/admin/producto/Producto.vue'
import PedidoNuevo from '../views/admin/pedido/PedidoNuevo.vue'
import PedidoLista from '../views/admin/pedido/PedidoLista.vue'

import AppLayout from '@/layout/AppLayout.vue';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '', component: Inicio },
        { path: '/servicios', component: Servicio },
        {
            path: '/login',
            component: Login,
            name: 'Login',
            meta: { redirectIfAuth: true }
        },
        {
            path: '/admin',
            component: AppLayout,
            children: [
                {
                    path: 'perfil',
                    component: Perfil,
                    name: 'Perfil',
                    meta: { requireAuth: true }
        
                },
                {
                    path: 'usuario',
                    component: Usuario,
                    name: 'Usuario',
                    meta: { requireAuth: true }
        
                },
                {
                    path: 'persona',
                    component: Persona,
                    name: 'Persona',
                    meta: { requireAuth: true }
        
                },
                {
                    path: 'categoria',
                    component: Categoria,
                    name: 'Categoria',
                    meta: { requireAuth: true }
        
                },
                {
                    path: 'producto',
                    component: Producto,
                    name: 'Producto',
                    meta: { requireAuth: true }
        
                },
                
                {
                    path: 'pedido',
                    component: PedidoLista,
                    name: 'PedidoLista',
                    meta: { requireAuth: true }
        
                },
                {
                    path: 'pedido/nuevo',
                    component: PedidoNuevo,
                    name: 'PedidoNuevo',
                    meta: { requireAuth: true }
        
                },
            ]
        },        
        {
            path: '/:pathMatch(.*)*',
            component: NotFound
        }
        
    ]
})

// GUARDS
router.beforeEach((to, from, next) => {
    
    let token = localStorage.getItem("access_token");

    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'})
        }
        return next();
    }

    //console.log(to.meta.redirectIfAuth);
    if(to.meta.redirectIfAuth && token){
        return next({name: 'Usuario'});
    }

    return next();
})

export default router;