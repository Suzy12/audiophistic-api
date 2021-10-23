import { Resena } from "../Modelo/Resena";
import DAO from "./DAO";
import { Objeto_Calificacion } from "../Modelo/Objeto_Calificacion";

export default class Gestor_Resenas{

    base_datos: DAO;

    constructor(){
        this.base_datos = DAO.get_instancia();
    }

    // Crea la calificaicon de un blog
    crear_calificacion_blog(id_consumidor:number, id_origen:number, calificación:number): Promise<Resena>{
        return this.base_datos.crear_clasificación_blog(id_consumidor, id_origen, calificación)
        .then((resultado: Resena) => {
            return resultado
        });

    }

    // Modificar calificacion blog
    modificar_calificacion_blog(id_calificacion: number, id_consumidor:number, id_origen:number, calificación:number): Promise<Resena>{
        return this.base_datos.modificar_clasificación_blog(id_calificacion, id_consumidor, id_origen, calificación)
        .then((resultado: Resena) => {
            return resultado
        });
    }

    // Crear un comentario para un blog
    crear_comentario_blog(id_consumidor: number, id_origen:number, comentario: string): Promise<Resena>{
        return this.base_datos.crear_comentario_blog(id_consumidor, id_origen, comentario)
        .then((resultado: Resena) => {
            return resultado
        });
    }

    // Modificar comentario de un blog

    modificar_comentario_blog(id_comentario: number, id_consumidor: number, id_origen:number, comentario: string): Promise<Resena>{
        return this.base_datos.modificar_comentario_blog(id_comentario, id_consumidor, id_origen, comentario)
        .then((resultado: Resena) => {
            return resultado
        });
    }


    // Eliminar Comentario blog
    eliminar_comentario_blog(id_comentario: number): Promise<string>{
        return this.base_datos.eliminar_comentario_blog(id_comentario);
    }

    // Crear la resena de un producto
    async crear_resena_producto(id_origen: number, id_usuario: number, calificacion: Objeto_Calificacion[]): Promise<Resena>{
        return this.base_datos.crear_resena_producto(id_origen, id_usuario, calificacion)
        .then((resultado: Resena) => {
            return resultado
        });
    }
    
    // Modificar la resena de un producto
    async modificar_resena_producto(id_resena: number, id_origen: number, id_usuario: number, calificacion: Objeto_Calificacion[]): Promise<Resena>{
        return this.base_datos.modificar_resena_producto(id_resena, id_origen,id_usuario, calificacion)
        .then((resultado: Resena) => {
            return resultado
        });
    }

    // Eliminar resena de un producto
    async eliminar_resena_producto(id_resena: number): Promise<Resena>{
        return this.base_datos.eliminar_resena_producto(id_resena);
    }

    // Consultar resena producto
    async consultar_resena_producto(id_resena: number): Promise<Resena>{
        return this.base_datos.eliminar_resena_producto(id_resena);
    }

}