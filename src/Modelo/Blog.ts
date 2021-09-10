export interface Blog {
    id_Blog:number;
    id_Autor:number;
    fecha_Creacion: Date;
    fecha_Modificacion: Date;
    id_Categoria:number;
    titulo: string
    etiquetas: string[];
    contenido: string;
    enlace: string;
    productos: number[];
} 