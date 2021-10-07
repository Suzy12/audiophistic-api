import { Carrito } from "../Modelo/Carrito";
import { Direccion } from "../Modelo/Direccion";
import { Sinpe } from "../Modelo/Sinpe";
import { Tarjeta } from "../Modelo/Tarjeta";
import { Tipo_de_Pago } from "../Modelo/Tipo_de_Pago";
import { Transferencia } from "../Modelo/Transferencia";
import DAO from "./DAO";



export default class Gestor_Pedidos {
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }


    //Realizar el checkout
    realizar_checkout(id_usuario: number, carrito: Carrito[], monto_total: number, nombre: string,
        correo: string, direccion: string | undefined , canton: string | undefined , provincia: string | undefined , cedula: number | undefined ,
        telefono: number | undefined , nombre_consumidor: string | undefined ): Promise<number> {
        return this.base_datos.realizar_checkout(id_usuario, carrito, monto_total, nombre, correo,
            direccion, canton, provincia, cedula,telefono, nombre_consumidor)
            .then((id_pedido: number) => {
                return id_pedido;
            })
    }


    // Realiza el pago con un pedido
    realizar_pago(id_pedido: number, id_metodo_pago: number, monto: number, subtotal: number, costo_envio: number,
        comprobante: string, direccion: string | undefined , canton: string | undefined , provincia: string | undefined , cedula: number | undefined ,
        telefono: number | undefined , nombre_consumidor: string | undefined): Promise<string> {
        let tipo_pago: Tipo_de_Pago;
        switch (id_metodo_pago) {
            case 1:
                tipo_pago = new Tarjeta();
                break;
            case 2:
                tipo_pago = new Transferencia();
                break;
            case 3:
                tipo_pago = new Sinpe();
                break;
            default:
                throw new Error("El tipo de pago no es válido");
        }

        return tipo_pago.pagar(id_pedido, monto, subtotal, costo_envio, comprobante,
            direccion, canton, provincia, cedula, telefono, nombre_consumidor)
            .then((resultado: string) => {
                return resultado;
            })
    }
}