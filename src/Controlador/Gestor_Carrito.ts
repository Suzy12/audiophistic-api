import { Carrito } from "../Modelo/Carrito";
import DAO from "./DAO";

export default class Gestor_Carrito {
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }

    // Consulta el contenido del carrito
    agregar_al_carrito(id_usuario: number, id_producto: number, id_estilo: number, cantidad: number): Promise<string> {
        return this.base_datos.agregar_al_carrito(id_usuario, id_producto, id_estilo, cantidad)
            .then((producto: string) => {
                return producto;
            })
    }

    // Consulta el contenido del carrito
    consultar_carrito(id_usuario: number): Promise<{ cambiado: boolean, carrito: Carrito[] }> {
        return this.base_datos.consultar_carrito(id_usuario)
            .then((producto: { cambiado: boolean, carrito: Carrito[] }) => {
                return producto;
            })
    }
}