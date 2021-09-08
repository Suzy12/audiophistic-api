import DAO  from "./DAO";
export default class Controlador {
    base_datos: DAO;
    constructor() {
        this.base_datos = DAO.get_instancia();
    }

}