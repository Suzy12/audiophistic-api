import { Producto } from "../Modelo/Producto"
import DAO from "./DAO";
export default class Gestor_Prodcuctos {

    // Definimos como hacer las llamadas la base de datos a traves del dao
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }

    // Crea el producto con los datos enviados
    crear_producto(producto: Producto): string {

        return "producto creado";

    }

    // Elimina el producto dado
    eliminar_producto(id_producto: number): string {

        return "producto eliminado";

    }

    // Obtiene los datos del producto
    consultar_producto(id_producto: number): Promise<Producto> {
        return this.base_datos.consultar_producto(id_producto)
            .then((producto: Producto) => {
                return producto;
            })
    }

    consultar_productos(): Promise<Producto[]> {
        return this.base_datos.consultar_productos()
            .then((producto: Producto[]) => {
                return producto;
            })
    }

    // Edita producto dado
    editar_producto(id_producto: number): string {

        return "producto modificado";
    }



}