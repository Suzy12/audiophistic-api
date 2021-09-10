import { Albumes } from "./Albumes";
import { Audifonos } from "./Audifonos";
import { Parlantes } from "./Parlantes";

export interface Producto {
    id_producto:number;
    id_creador?:number;
    id_blog?:number;
    titulo: string
    precio: number;
    tipo_envio?: number;
    descripcion?: string;
    fecha_lanzamiento?: Date;
    enlace?: string;
    tipo: Audifonos | Albumes | Parlantes;
} 