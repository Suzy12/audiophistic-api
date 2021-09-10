import DAO from "./DAO";
import { Usuario } from "../Modelo/Usuario"
import Manejador_Tokens from "./Manejador_Tokens";
const bcrypt = require('bcrypt');
export default class Controlador_login {
    private base_datos: DAO;
    private manejador_token: Manejador_Tokens;
    constructor() {
        this.base_datos = DAO.get_instancia();
        this.manejador_token = Manejador_Tokens.get_instancia();
    }

    async verificar_contrasena(correo: string, contrasena: string): Promise<{token: string}> {
        let datosUsuario: any = await this.base_datos.obtener_usuario(correo);
        let misma_contrasena = await bcrypt.compare(contrasena, datosUsuario.contrasena);
        if (misma_contrasena) {
            return this.crear_token(datosUsuario.id_usuario,datosUsuario.email, datosUsuario.id_tipo);
        } else {
            throw new Error("La contraseña es incorrecta");
        }
    }

    crear_token(id_usuario: number, correo: string, id_tipo: number): {token: string} {
        return this.manejador_token.crear_token(id_usuario,correo,id_tipo);
    }


    verificar_token(bearer: string): Usuario{
        return this.manejador_token.descifrar_token(bearer.split(' ')[1]);
    }

}