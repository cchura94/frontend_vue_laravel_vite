<template>
    <div class="card">

        <h5>NOMBRE: {{ perfil.name }}</h5>

        <h5>CORREO: {{ perfil.email }}</h5>

        <h5>CREADO EN: {{ perfil.created_at }}</h5>
        

        <button @click="salir()">Salir</button>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
    import authService from "./../../../services/auth.service"

    const router = useRouter()

    const perfil = ref({});

    onMounted(() => {
        obtenerPerfil()
    })

    async function obtenerPerfil(){
        try {
            const {data} = await authService.perfil()
            perfil.value = data;
            
        } catch (error) {
            alert("Error al recuperar los datos de perfil")
        }
    }

    async function salir(){
        try {
            const {data} = await authService.salir();
            localStorage.removeItem("access_token");
            router.push({name: 'Login'});

        } catch (error) {
            
        }
    }

</script>