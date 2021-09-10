export interface Blog {
    id_blog:number;
    id_autor:number;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    id_categoria:number;
    titulo: string
    etiquetas: string[];
    contenido: string;
    enlace: string;
    productos: number[];
} 