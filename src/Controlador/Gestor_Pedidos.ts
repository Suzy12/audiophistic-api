import { Pedido } from "../Modelo/Pedido";
import DAO from "./DAO";


export default class Gestor_Pedidos {
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }


    // Realiza el pago con un pedido
    realizar_pago(pedido: Pedido): Promise<string>{
        return this.base_datos.realizar_pago(pedido)
            .then((pedido: string) => {
                return pedido;
            })
    }
}