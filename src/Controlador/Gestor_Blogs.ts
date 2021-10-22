import { Blog } from "../Modelo/Blog";
import DAO from "./DAO";


export default class Gestor_Blogs {

    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }

    //Crea el blog
    crear_blog(id_creador: number, id_categoria: number, titulo: string, imagen: string,
        etiquetas: string[], contenido: string, productos: number[]): Promise<Blog> {
        return this.base_datos.crear_blog(id_creador, id_categoria, titulo, imagen, etiquetas,
            contenido, productos)
            .then((resultado: Blog) => {
                return resultado
            });

    }

    // modificar un blog
    modificar_blog(id_creador: number, id_blog: number, id_categoria: number, titulo: string, imagen: string,
        etiquetas: string[], contenido: string, productos: number[]): Promise<Blog> {
        return this.base_datos.modificar_blog(id_creador, id_blog, id_categoria, titulo, imagen, 
            etiquetas, contenido, productos)
            .then((resultado: Blog) => {
                return resultado
            });
    }


    // Consulta un blog 
    consultar_blog(id_blog: number): Promise<Blog> {
        return this.base_datos.consultar_blog(id_blog)
            .then((blog: Blog) => {
                return blog;
            })

    }

    // Consultar los blogs de un creador
    consultar_blogs_por_creador(id_autor: number): Promise<Blog[]> {
        return this.base_datos.consultar_blogs_por_creador(id_autor)
            .then((blog: Blog[]) => {
                return blog;
            })
    }

    // Obtiene blogs, mas su foto, de un creador de contenido segun su ID
    thumbnail_blogs_por_creador(id_creador_contenido: number): Promise<Blog[]> {
        return this.base_datos.thumbnail_blogs_por_creador(id_creador_contenido)
            .then((blog: Blog[]) => {
                return blog;
            })
    }

    // Obtiene todos los blogs
    consultar_blogs(): Promise<Blog[]> {
        return this.base_datos.consultar_blogs()
            .then((blog: Blog[]) => {
                return blog;
            })
    }

    // Obtiene todos los blogs
    consultar_thumbnail_blogs(): Promise<Blog[]> {
        return this.base_datos.consultar_thumbnail_blogs()
            .then((blog: Blog[]) => {
                return blog;
            })
    }


    // Cambia el estado de un blog a inactivo
    eliminar_blog(id_blog: number): Promise<string> {
        return this.base_datos.eliminar_blog(id_blog);
    }

    // Cambia el estado de un blog del creador a inactivo
    eliminar_mi_blog(id_blog: number, id_creador: number): Promise<string> {
        return this.base_datos.eliminar_mi_blog(id_blog, id_creador);
    }

}