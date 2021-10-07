import DAO from "../Controlador/DAO";
import { Direccion } from "./Direccion";
import { Tipo_de_Pago } from "./Tipo_de_Pago";

export class Transferencia extends Tipo_de_Pago{

    base_de_datos: DAO;

    constructor(id_tipo = 3, nombre_tipo = "Transferencia"){
        super(id_tipo, nombre_tipo);
        this.base_de_datos= DAO.get_instancia();
    }

    async pagar(id_pedido: number, monto: number, subtotal: number, costo_envio: number, comprobante: string, 
        direccion: string | undefined , canton: string | undefined , provincia: string | undefined , cedula: number | undefined ,
        telefono: number | undefined , nombre_consumidor: string | undefined): Promise<string>{
        return this.base_de_datos.realizar_pago(id_pedido, monto, subtotal, costo_envio, comprobante, direccion, 
                                                canton, provincia, cedula, telefono, nombre_consumidor);
    }
}