export interface Blog {
    id_creador:number;
    id_blog:number;
    version_blog: number;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    id_categoria:number;
    titulo: string
    etiquetas: string[];
    contenido: string;
    activo: boolean;
    enlace: string;
    //productos: number[];
} 