import { Direccion } from "./Direccion";

// Se utiliza el patron strategy para simular los pagos

// La clase abstracta Tipo_de_Pago maneja el Strategy
export abstract class Tipo_de_Pago{
    id_tipo: number;
    nombre_tipo?: string;

    constructor(id_tipo: number, nombre_tipo: string){
        this.id_tipo = id_tipo;
        this.nombre_tipo = nombre_tipo;
    }

    abstract pagar(id_pedido: number, direccion_pedido: Direccion): Promise<string>;

}