import { Tipo_Usuario } from "./Tipo_Usuario";
export interface Usuario {
    id_usuario:number;
    nombre?: string
    email: string;
    tipo: Tipo_Usuario;
} 
