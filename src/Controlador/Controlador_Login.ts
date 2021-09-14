import { Usuario } from "../Modelo/Usuario"
import Manejador_Tokens from "./Manejador_Tokens";
import Enviador_Correos from "./Enviador_Correos";
import Gestor_Usuarios from "./Gestor_Usuarios";
import bcrypt from 'bcrypt';

/* Se encarga de verificar el inicio de sesion y los
   Y los permisos que tiene un usuario para ciertas acciones */
export default class Controlador_login {
    // Definimos como hacer las llamadas la base de datos a traves del dao
    private envio_correos: Enviador_Correos;
    private manejador_token: Manejador_Tokens;
    private gestor_usuarios: Gestor_Usuarios;
    constructor() {
        this.envio_correos = Enviador_Correos.get_instancia();
        this.manejador_token = Manejador_Tokens.get_instancia();
        this. gestor_usuarios = new Gestor_Usuarios();
    }

    /* Verifica la combinación del correo con la contraseña
       Devuelve un token y el id del tipo del usuario en caso de ser correctos los datos*/
    async verificar_contrasena(correo: string, contrasena: string): Promise<{ id_tipo: number, token: string }> { //Metodo de verificacion de contrasena
        let datosUsuario: Usuario = await this.gestor_usuarios.verificar_usuario(correo);
        let misma_contrasena = await bcrypt.compare(contrasena, datosUsuario.contrasena as string);
        if (misma_contrasena) {
            return {
                id_tipo: datosUsuario.tipo!.id_tipo,
                ...this.crear_token(datosUsuario.id_usuario, datosUsuario.email, datosUsuario.tipo!.id_tipo)
            };
        } else {
            throw new Error("La contraseña es incorrecta");
        }
    }

    // Genera un token con los datos del usuario
    crear_token(id_usuario: number, correo: string, id_tipo: number): { token: string } { //se llama al manejador de tokens
        return this.manejador_token.crear_token(id_usuario, correo, id_tipo);
    }

    validar_token(token: string): boolean{
        return this.manejador_token.validar_token(token)
    }

    descifrar_token(token: string): Usuario{
        return this.manejador_token.descifrar_token(token)
    }

    verificar_permisos(token: string, permiso: number): boolean {
        return this.manejador_token.verificar_permisos(token) === permiso;
    }

}