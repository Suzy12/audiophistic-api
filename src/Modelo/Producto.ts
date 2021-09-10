export interface Producto {
    id_Producto:number;
    id_Creador?:number;
    id_Blog?:number;
    titulo: string
    precio: number;
    tipo_Envio?: number;
    descripcion?: string;
    fecha_Lanzamiento?: Date;
    enlace?: string;
} 