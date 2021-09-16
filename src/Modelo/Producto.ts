import { Album } from "./Album";
import { Audifonos } from "./Audifonos";
import { Parlante } from "./Parlante";
import { Tipo_Producto } from "./Tipo_Producto";

export interface Producto {
    id_producto:number;
    id_creador?:number;
    nombre_creador?: number;
    id_blog?:number;
    titulo: string
    precio: number;
    tipo_envio?: number;
    descripcion?: string;
    fecha_lanzamiento?: Date;
    enlace?: string;
    foto? : string;
    caracteristicas: Tipo_Producto | Audifonos | Album | Parlante;
} 