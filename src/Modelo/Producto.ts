

class Producto {

    id_Producto:number;
    id_Creador:number;
    id_Blog:number;
    titulo: string
    precio: number;
    tipo_Envio: number;
    descripcion: string;
    //fecha_Lanzamiento: Date;
    enlace: string;

    constructor(){
        this.id_Producto= 0;
        this.id_Creador= 0;
        this.id_Blog= 0;
        this.titulo= "";
        this.precio= 0;
        this.tipo_Envio= 0;
        this.descripcion= "";
        //this.fecha_Lanzamiento= ;
        this.enlace= "";
    }

} 