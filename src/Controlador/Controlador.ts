import DAO from "./DAO";
const bcrypt = require('bcrypt');
export default class Controlador {
    base_datos: DAO;
    private static salts = 10
    constructor() {
        this.base_datos = DAO.get_instancia();
    }
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{resultado: string}> {
        let hash: string = await bcrypt.hash(contrasena, Controlador.salts)
        let resultado: string = await this.base_datos.cambiar_contrasena(id_usuario, hash)
        return { resultado };
    }
    get_producto(id_producto: number) {
        return Promise.resolve({ resultado: "Todo bien" });
    }

}
