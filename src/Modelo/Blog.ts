

class Blog {

    id_Blog:number;
    id_Autor:number;
    //fecha_Creacion: Date;
    //fecha_Modificacion: Date;
    id_Categoria:number;
    titulo: string
    etiquetas: string[];
    contenido: string;
    enlace: string;
    productos: number[];

    constructor(){
        this.id_Blog= 0;
        this.id_Autor= 0;
        //this.fecha_Creacion= ;
        //this.fecha_Modificacion= ;
        this.id_Categoria= 0;
        this.titulo= "";
        this.etiquetas= [""];
        this.contenido= "";
        this.enlace= "";
        this.productos= [0];
    }

} 