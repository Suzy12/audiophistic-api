import DAO from "./DAO";
const bcrypt = require('bcrypt');
export default class Controlador {
    base_datos: DAO;
    private static salts = 10
    constructor() {
        this.base_datos = DAO.get_instancia();
    }
    cambiar_contrasena(id_usuario: number, contrasena: string) {
        return bcrypt.hash(contrasena, Controlador.salts)
            .then((hash: string) => {
                return { resultado: this.base_datos.cambiar_contrasena(id_usuario, hash) };
            })
    }

}
