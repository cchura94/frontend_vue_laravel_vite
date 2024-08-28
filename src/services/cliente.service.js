import { Api } from "./ApiService";

export default {
    listar: (page=1, limit=10, q='') => {
        return Api().get(`/cliente?page=${page}&q=${q}&limit=${limit}`);
    },
    guadar: (datos) => {
        return Api().post("/cliente", datos);
    },
    mostrar: (id) => {
        return Api().get(`/cliente/${id}`);
    },
    modificar: (id, datos) => {
        return Api().put(`/cliente/${id}`, datos);
    },
    eliminar: (id) => {
        return Api().delete(`/cliente/${id}`);
    },
    buscar: (q='') => {
        return Api().get(`/cliente/buscar?q=${q}`);
    }
}