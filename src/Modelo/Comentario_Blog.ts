import { Resena } from "./Resena";

export interface Comentario_Blog extends Resena{

    id_blog: number;
    comentario: string;
    fecha: Date;

}