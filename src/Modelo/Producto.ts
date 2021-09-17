import { Tipos_Producto } from "./Tipos_Producto";

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
    caracteristicas: Tipos_Producto;
} 