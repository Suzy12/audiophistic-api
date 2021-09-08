import DAO from "./DAO";
const bcrypt = require('bcrypt');
var jwt = require('json-web-token') //esto
export default class Controlador_login {
    base_datos: DAO;
    private salts = 10
    secret = 'TOPSECRETTTTT' //esto
    constructor() {
        this.base_datos = DAO.get_instancia();
    }

    async verificar_contrasena(correo: string, contrasena: string) {
        let datosUsuario: any = await this.base_datos.obtener_usuario(correo);
        if (datosUsuario.error) {
            return datosUsuario;
        }
        console.log(datosUsuario);
        let misma_contrasena = await bcrypt.compare(contrasena, datosUsuario.contrasena);
        if (misma_contrasena) {
            return this.crear_token(1,"correo", 1);
        } else {
            return { error: { message: "La contraseña es incorrecta" } };
        }
    }

    crear_token(id_usuario: number, correo: string, id_tipo: number) {
        return {token:"mi token"};
    }

}