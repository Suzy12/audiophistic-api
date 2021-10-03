export interface Carrito {
    id_consumidor:number;
    id_producto:number;
    id_estilo?:number;
    nombre: string;
    nombre_estilo?: string;
    precio: number;
    cantidad:number; 
    foto: string; 
} 
