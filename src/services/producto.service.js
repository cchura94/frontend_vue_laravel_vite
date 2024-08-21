import { Api } from "./ApiService";

export default {
    listar: (page=1, limit=10, q='') => {
        return Api().get(`/producto?page=${page}&q=${q}&limit=${limit}`);
    },
    guadar: (datos) => {
        return Api().post("/producto", datos);
    },
    mostrar: (id) => {
        return Api().get(`/producto/${id}`);
    },
    modificar: (id, datos) => {
        return Api().put(`/producto/${id}`, datos);
    },
    eliminar: (id) => {
        return Api().delete(`/producto/${id}`);
    },
}