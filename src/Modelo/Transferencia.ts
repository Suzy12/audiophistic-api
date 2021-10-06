import { Tipo_de_Pago } from "./Tipo_de_Pago";

export interface Transferencia extends Tipo_de_Pago{
    num_cuenta: number;
}