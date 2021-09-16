import { Administrador } from "./Administrador";
import { Consumidor } from "./Consumidor";
import { Creador_de_Contenido } from "./Creador_de_Contenido";
import { Tipo_Usuario } from "./Tipo_Usuario";

export interface Usuario {
    id_usuario:number;
    nombre?: string;
    correo: string;
    confirmado?: boolean;
    contrasena?: string
    caracteristicas?: Tipo_Usuario | Administrador | Creador_de_Contenido | Consumidor;
} 
