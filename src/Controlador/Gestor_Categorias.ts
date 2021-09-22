import { Categoria } from "../Modelo/Categoria";
import DAO from "./DAO";

export default class Gestor_Categorias{

    //Se define como hacer las llamadas al DAO
    base_datos: DAO;

    constructor(){
        this.base_datos = DAO.get_instancia();
    }

    //crea una categoria nueva
    crear_categoria(nombre: string, fecha_creacion: Date, cant_blogs: number): Promise<string>{
        return this.base_datos.crear_categoria(nombre, fecha_creacion, cant_blogs);
    }


}