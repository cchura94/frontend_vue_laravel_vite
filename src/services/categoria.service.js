import { Api } from "./ApiService";

export default {
    listar: () => {
        return Api().get("/categoria");
    },
    guadar: (datos) => {
        return Api().post("/categoria", datos);
    },
    mostrar: (id) => {
        return Api().get(`/categoria/${id}`);
    },
    modificar: (id, datos) => {
        return Api().put(`/categoria/${id}`, datos);
    },
    eliminar: (id) => {
        return Api().delete(`/categoria/${id}`);
    },
}