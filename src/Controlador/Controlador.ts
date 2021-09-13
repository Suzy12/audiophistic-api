import DAO from "./DAO";
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";

/* Se encarga de coordinar las funcionalidades 
   De la pagina web con sus clases respectivas*/
export default class Controlador {
    /* Definimos como hacer las llamadas la base de datos 
       A traves del dao */
    base_datos: DAO;
    
    gestor_productos: Gestor_Prodcuctos
    gestor_usaurios: Gestor_Usuarios

    constructor() {
        this.base_datos = DAO.get_instancia();
        this.gestor_productos = new Gestor_Prodcuctos();
        this.gestor_usaurios = new Gestor_Usuarios();
    }
    
    // Cambia la contrasena del usuario con los datos dados
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{resultado: string}> {
        return this.gestor_usaurios.cambiar_contrasena(id_usuario, contrasena);
    }

    // Consulta los datos del producto respectivo
    consultar_producto(id_producto: number): Promise<Producto> { 
        return this.gestor_productos.consultar_producto(id_producto);
    }

    // Consulta los datos del usuario
    consultar_usuario(id_usuario: number): Promise<Usuario>{
        return this.gestor_usaurios.consultar_usuario(id_usuario);
    }

}
