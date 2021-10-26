import { Producto } from "../Modelo/Producto";
import { Blog } from "../Modelo/Blog";
import DAO from "./DAO";

export default class Gestor_Busquedas{

    base_datos: DAO;

    constructor(){
        this.base_datos = DAO.get_instancia();
    }


    // Busqueda General
    busqueda_general_creador(): Promise<{ imagen: string, nombre: string, ubicacion: string}>{
        return this.base_datos.busqueda_general_creador()
        .then((resultado: { imagen: string, nombre: string
            ubicacion:string}) => {
            return resultado
        });
    }

    // Busqueda de Parlantes
    buscar_parlantes(titulo: string, marca: string, tipo_conexion: string, precio_min: number, precio_max:number):Promise<Producto[]> {
        return this.base_datos.buscar_parlantes(titulo, marca, tipo_conexion, precio_min, precio_max)
        .then((resultado: Producto[]) => {
            return resultado
        });
    }

    // Busqueda de Audifonos
    buscar_audifonos(titulo: string, marca: string, tipo_conexion: string, precio_min: number, precio_max:number):Promise<Producto[]> {
        return this.base_datos.buscar_audifonos(titulo, marca, tipo_conexion, precio_min, precio_max)
        .then((resultado: Producto[]) => {
            return resultado
        });
    }

    // Busqueda de Almbumes
    buscar_albumes(titulo: string, presentaciones: string, genero: string, precio_min: number, precio_max:number):Promise<Producto[]> {
        return this.base_datos.buscar_audifonos(titulo, presentaciones, genero, precio_min, precio_max)
        .then((resultado: Producto[]) => {
            return resultado
        });
    }

    // Busqueda de Blogs
    buscar_blogs(titulo: string, id_categoria: number, fecha_min: Date, fecha_max: Date): Promise<Blog[]>{
        return this.base_datos.buscar_blogs(titulo, id_categoria, fecha_min, fecha_max)
        .then((resultado: Blog[]) => {
            return resultado
        });
    }

    // Buscar marcas
    buscar_marcas(): Promise<string[]>{
        return this.base_datos.buscar_marcas()
        .then((resultado: string[]) => {
            return resultado
        });
    }

    // Buscar Tipos de Conexiones
    buscar_tipos_conexiones(): Promise<string[]>{
        return this.base_datos.buscar_tipos_conexiones()
        .then((resultado: string[]) => {
            return resultado
        });
    }

    // Buscar Presentaciones
    buscar_presentaciones(): Promise<string[]>{
        return this.base_datos.buscar_presentaciones()
        .then((resultado: string[]) => {
            return resultado
        });
    } 

    // Buscar Generos
    buscar_generos(): Promise<string[]>{
        return this.base_datos.buscar_generos()
        .then((resultado: string[]) => {
            return resultado
        });
    }

}