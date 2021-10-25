import { Tipos_Producto } from "./Tipos_Producto";

export interface Producto {
    id_producto:number;
    id_creador:number;
    nombre_creador: number;
    id_blog?:number;
    nombre_blog?: string;
    titulo: string
    precio: number;
    tiempo_envio?: number;
    descripcion?: string;
    fecha_lanzamiento?: number;
    enlace?: string;
    imagen? : string;
    caracteristicas: Tipos_Producto;
} 