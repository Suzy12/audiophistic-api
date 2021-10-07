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
    realizar_checkout(id_usuario: number, carrito: Carrito[], monto_total: number, nombre: string,
        correo: string, direccion_pedido: Direccion): Promise<number>{
        return this.base_datos.realizar_checkout(id_usuario, carrito, monto_total, nombre, correo,  direccion_pedido)
        .then((id_pedido: number) => {
            return id_pedido;
        })
    }


    // Realiza el pago con un pedido
    realizar_pago(id_pedido: number, direccion_pedido: Direccion): Promise<string>{
        return this.base_datos.realizar_pago(id_pedido, direccion_pedido)
            .then((pedido: string) => {
                return pedido;
            })
    }
}