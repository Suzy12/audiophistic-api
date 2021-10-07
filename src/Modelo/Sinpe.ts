import DAO from "../Controlador/DAO";
import { Direccion } from "./Direccion";
import { Tipo_de_Pago } from "./Tipo_de_Pago";

export class Sinpe extends Tipo_de_Pago{

    base_de_datos: DAO;
    num_telefono: number;

    constructor(id_tipo = 2, nombre_tipo = "SINPE", num_telefono: number){
        super(id_tipo, nombre_tipo);
        this.num_telefono = num_telefono;
        this.base_de_datos= DAO.get_instancia();
    }

    async pagar(id_pedido: number, direccion_pedido: Direccion): Promise<string>{
        await new Promise(f => setTimeout(f, 5000));
        return this.base_de_datos.realizar_pago(id_pedido, direccion_pedido);
    }
}