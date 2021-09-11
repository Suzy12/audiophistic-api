import { Resenas } from "./Resenas";

export interface Resenas_Producto extends Resenas{

    id_producto: number;
    id_tipo_producto: number;
    comentario: string;
    calificacion: object[];

}