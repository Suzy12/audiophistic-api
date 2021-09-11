import { Administrador } from "./Administrador";
import { Consumidor } from "./Consumidor";
import { Creador_de_Contenido } from "./Creador_de_Contenido";

export interface Usuario {
    id_usuario:number;
    nombre?: string
    email: string;
    tipo?: Administrador | Creador_de_Contenido | Consumidor;
} 
