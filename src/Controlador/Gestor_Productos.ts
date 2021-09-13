import { Producto } from "../Modelo/Producto"
import DAO from "./DAO";
export default class Gestor_Prodcuctos {

    //Definimos como hacer las llamadas al DAO
    base_datos: DAO;

    constructor(){
        this.base_datos = DAO.get_instancia();
    }

    //Crear Producto
    crear_producto(muchas_cosas: Producto): string {

        return "producto creado";

    }

    //eliminar producto
    eliminar_usuario(id_producto: number): string{

        return "producto eliminado";

    }

    //Consulta Producto
    consultar_producto(id_producto: number): Promise<Producto>{
        return this.base_datos.obtener_producto(id_producto).then((producto:any) =>{
            return producto
        })

    }

    //edita producto
    editar_producto(id_producto: number): string{

        return "producto modificado";
    }



}