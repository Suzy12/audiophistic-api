import DAO from "./DAO";
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";

export default class Controlador {
    base_datos: DAO; //Se llama a la BD por medio del DAO
    
    gestor_productos: Gestor_Prodcuctos
    gestor_usaurios: Gestor_Usuarios
    //private controlador_login: Controlador_login;
    //private gUsuario: Gestor_Usuarios;

    constructor() {
        this.base_datos = DAO.get_instancia();
        this.gestor_productos = new Gestor_Prodcuctos();
        this.gestor_usaurios = new Gestor_Usuarios();
    }
    
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{resultado: string}> {
        return this.gestor_usaurios.cambiar_contrasena(id_usuario, contrasena);
    }

    get_producto(id_producto: number): Promise<Producto> { //para obetener producto se llama al DAO
        return this.base_datos.obtener_producto(id_producto)
        .then((producto: Producto) => {
            return producto;
        })
    }

    
    get_usuario(id_usuario: number): Promise<Usuario>{ //para obtener usuario, se llama al DAO
        return this.base_datos.obtener_usuario(id_usuario)
        .then((usuario: Usuario) => {
            return usuario;
        })
    }
    
    /*
    get_usuario(id_usuario: number) {
        //let resultado: string = await this.base_datos.get_usuario(id_usuario);
    }*/


}
