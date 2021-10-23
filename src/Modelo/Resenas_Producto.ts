import { Resena } from "./Resena";

export interface Resenas_Producto extends Resena{

    id_consumidor: number;
    id_producto: number;
    comentario: string;
    calificacion: number;

}