import DAO from "./DAO";
import Manejador_Tokens from "./Manejador_Tokens";
const bcrypt = require('bcrypt');
export default class Controlador_login {
    private base_datos: DAO;
    private manejador_token: Manejador_Tokens;
    constructor() {
        this.base_datos = DAO.get_instancia();
        this.manejador_token = Manejador_Tokens.get_instancia();
    }

    async verificar_contrasena(correo: string, contrasena: string) {
        let datosUsuario: any = await this.base_datos.obtener_usuario(correo);
        if (datosUsuario.error) {
            return datosUsuario;
        }
        let misma_contrasena = await bcrypt.compare(contrasena, datosUsuario.contrasena);
        if (misma_contrasena) {
            return this.crear_token(datosUsuario.id_usuario,datosUsuario.email, datosUsuario.id_tipo);
        } else {
            return { error: { message: "La contraseña es incorrecta" } };
        }
    }

    crear_token(id_usuario: number, correo: string, id_tipo: number) {
        return this.manejador_token.crear_token(id_usuario,correo,id_tipo);
    }

    descifrar_token(token: string) {
        return this.manejador_token.descifrar_token(token);
    }

}