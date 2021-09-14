import DAO from "./DAO";
import { Usuario } from "../Modelo/Usuario"
import Manejador_Tokens from "./Manejador_Tokens";
const bcrypt = require('bcrypt');

/* Se encarga de verificar el inicio de sesion y los
   Y los permisos que tiene un usuario para ciertas acciones */
export default class Controlador_login { 
    // Definimos como hacer las llamadas la base de datos a traves del dao
    private base_datos: DAO;
    private manejador_token: Manejador_Tokens;
    constructor() {
        this.base_datos = DAO.get_instancia();
        this.manejador_token = Manejador_Tokens.get_instancia();
    }

    // Verifica la combinación del correo con la contraseña
    async verificar_contrasena(correo: string, contrasena: string): Promise<{id_tipo: number, token: string}> { //Metodo de verificacion de contrasena
        let datosUsuario: any = await this.base_datos.verificar_usuario(correo);
        let misma_contrasena = await bcrypt.compare(contrasena, datosUsuario.contrasena);
        console.log(datosUsuario);
        if (misma_contrasena) {
            return { id_tipo:datosUsuario.id_tipo,
                ...this.crear_token(datosUsuario.id_usuario,datosUsuario.email, datosUsuario.id_tipo)};
        } else {
            throw new Error("La contraseña es incorrecta");
        }
    }

    // Genera un token con los datos del usuario
    crear_token(id_usuario: number, correo: string, id_tipo: number): {token: string} { //se llama al manejador de tokens
        return this.manejador_token.crear_token(id_usuario,correo,id_tipo);
    }

    verificar_permisos(token: string, permiso: number): boolean{
        return this.manejador_token.verificar_permisos(token, permiso) === permiso;
    }

}