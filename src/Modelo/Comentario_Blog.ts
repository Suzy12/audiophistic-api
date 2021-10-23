import { Resena } from "./Resena";

export interface Comentario_Blog extends Resena{

    id_consumidor: number;
    comentario: string;

}