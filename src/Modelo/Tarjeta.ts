import { Tipo_de_Pago } from "./Tipo_de_Pago";

export interface Tarjeta extends Tipo_de_Pago{
    num_tarjeta: number;
}