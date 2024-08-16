<template>
    <div class="card">

        <h5>NOMBRE: {{ perfil.name }}</h5>

        <h5>CORREO: {{ perfil.email }}</h5>

        <h5>CREADO EN: {{ perfil.created_at }}</h5>
        

    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import authService from "./../../../services/auth.service"

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

</script>