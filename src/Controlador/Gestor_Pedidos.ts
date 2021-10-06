import { Pedido } from "../Modelo/Pedido";
import { Carrito } from "../Modelo/Carrito";
import { Direccion } from "../Modelo/Direccion";
import DAO from "./DAO";



export default class Gestor_Pedidos {
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }


    //Realizar el checkout
    realizar_checkout(carrito: Carrito, monto_total: number, direccion_pedido: Direccion, direccion_facturacion: Direccion): Promise<Pedido>{
        return this.base_datos.realizar_checkout(carrito, monto_total, direccion_pedido, direccion_facturacion)
        .then((pedido: Pedido) => {
            return pedido;
        })
    }


    // Realiza el pago con un pedido
    realizar_pago(pedido: Pedido): Promise<string>{
        return this.base_datos.realizar_pago(pedido)
            .then((pedido: string) => {
                return pedido;
            })
    }
}