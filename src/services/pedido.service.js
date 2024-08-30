import { Api } from "./ApiService";

export default {
    listar: (page=1, limit=10, q='') => {
        return Api().get(`/pedido?page=${page}&q=${q}&limit=${limit}`);
    },
    guadar: (datos) => {
        return Api().post("/pedido", datos);
    },
    descargarPDF: (id) => {
        return Api().get(`/pedido/${id}/reporte-pdf`, {responseType: 'blob'});
    },
    mostrar: (id) => {
        return Api().get(`/pedido/${id}`);
    },
    modificar: (id, datos) => {
        return Api().put(`/pedido/${id}`, datos);
    },
    eliminar: (id) => {
        return Api().delete(`/pedido/${id}`);
    },
    buscar: (q='') => {
        return Api().get(`/pedido/buscar?q=${q}`);
    }
}