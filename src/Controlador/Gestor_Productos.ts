import { Producto } from "../Modelo/Producto"
import DAO from "./DAO";
export default class Gestor_Prodcuctos {
    base_datos: DAO;

    constructor(){
        this.base_datos = DAO.get_instancia();
    }

    crear_producto(muchas_cosas: Producto): string {

        return "producto creado";

    }

    eliminar_usuario(id_producto: number): string{

        return "producto eliminado";

    }

    
    consultar_usuario(id_producto: number): Promise<Producto>{
        return this.base_datos.obtener_producto(id_producto).then((producto:any) =>{
            return producto
        })

    }

    editar_usuario(id_producto: number): string{

        return "producto modificado";
    }



}