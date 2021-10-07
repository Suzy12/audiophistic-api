import DAO from "../Controlador/DAO";
import { Direccion } from "./Direccion";
import { Tipo_de_Pago } from "./Tipo_de_Pago";

export class Transferencia extends Tipo_de_Pago{

    base_de_datos: DAO;
    num_cuenta: number;

    constructor(id_tipo = 3, nombre_tipo = "Transferencia", num_cuenta: number){
        super(id_tipo, nombre_tipo);
        this.num_cuenta = num_cuenta;
        this.base_de_datos= DAO.get_instancia();
    }

    async pagar(id_pedido: number, direccion_pedido: Direccion): Promise<string>{
        await new Promise(f => setTimeout(f, 5000));
        return this.base_de_datos.realizar_pago(id_pedido, direccion_pedido);
    }
}