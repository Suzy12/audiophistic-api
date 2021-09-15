import { Resena } from "./Resena";

export interface Resenas_Producto extends Resena{

    id_producto: number;
    id_tipo_producto: number;
    comentario: string;
    calificacion: object[];

}