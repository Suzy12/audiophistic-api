import { Resenas } from "./Resenas";

export interface Comentario_Blog extends Resenas{

    id_blog: number;
    comentario: string;
    fecha: Date;

}