import DAO from "./DAO";
import Gestor_Usuarios from "./Gestor_Usuarios";
import Controlador_login from "./Controlador_Login";
const bcrypt = require('bcrypt');
export default class Controlador {
    base_datos: DAO;
    private static salts = 10
    //private controlador_login: Controlador_login;
    //private gUsuario: Gestor_Usuarios;

    constructor() {
        this.base_datos = DAO.get_instancia();
        //this.controlador_login = Controlador_login;
        //this.gUsuario = Gestor_Usuarios.consultar_usuario();

    }
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{resultado: string}> {
        let hash: string = await bcrypt.hash(contrasena, Controlador.salts)
        let resultado: string = await this.base_datos.cambiar_contrasena(id_usuario, hash)
        return { resultado };
    }
    get_producto(id_producto: number) {
        return Promise.resolve({ resultado: "Todo bien" });
    }

    
    async get_usuario(id_usuario: number): Promise<{resultado: string}>{
        return Promise.resolve({ resultado: "Todo normal" });
    }
    
    /*
    get_usuario(id_usuario: number) {
        //let resultado: string = await this.base_datos.get_usuario(id_usuario);
    }*/


}
