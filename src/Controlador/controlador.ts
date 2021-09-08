import DAO  from "./DAO";
const bcrypt = require('bcrypt');
export default class Controlador {
    base_datos: DAO;
    private salts = 10
    constructor() {
        this.base_datos = DAO.get_instancia();
    }
    cambiar_contrasena(id_usuario: number, contrasena: String) {
        return bcrypt.hash(contrasena, this.salts)
            .then((hash: String) => {
                return {resultado: this.base_datos.cambiar_contrasena(id_usuario, hash)};
            })
    }

}