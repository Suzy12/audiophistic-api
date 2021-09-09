class Estilos {

    id_Producto:number;
    id_Estilo:number;
    existencia:number;
    nombre: string
    precio: number;
    descripcion: string;
    fotos: string[];

    constructor(){
        this.id_Producto= 0;
        this.id_Estilo= 0;
        this.existencia= 0;
        this.nombre= "";
        this.precio= 0;
        this.descripcion= "";
        this.fotos= [""];
    }

} 