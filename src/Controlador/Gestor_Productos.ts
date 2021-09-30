import { Estilo } from "../Modelo/Estilo";
import { Producto } from "../Modelo/Producto"
import DAO from "./DAO";
export default class Gestor_Prodcuctos {

    // Definimos como hacer las llamadas la base de datos a traves del dao
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }

    // Crea el producto con los datos enviados
    crear_producto(producto: Producto, estilos: Estilo[]): Promise<string> {
        // Revisa si los datos opcionales están completos
        if (producto.fecha_lanzamiento && producto.tiempo_envio && producto.descripcion)
            return this.base_datos.crear_producto(producto.id_creador, producto.caracteristicas.id_tipo,
                producto.fecha_lanzamiento, producto.titulo, producto.precio, producto.tiempo_envio,
                producto.descripcion, producto.caracteristicas, estilos)
                .then((resultado: string) => {
                    return resultado;
                });
        else {
            throw new Error("Los datos están incompletos");
        }
    }

    modificar_producto(producto: Producto, estilos: Estilo[]): Promise<string> {
        // Revisa si los datos opcionales están completos
        if (producto.fecha_lanzamiento && producto.tiempo_envio && producto.descripcion)
            return this.base_datos.modificar_producto(producto.id_producto, producto.id_creador,
                producto.fecha_lanzamiento, producto.titulo, producto.precio, producto.tiempo_envio,
                producto.descripcion, producto.caracteristicas, estilos)
                .then((resultado: string) => {
                    return resultado;
                });
        else {
            throw new Error("Los datos están incompletos");
        }
    }


    modificar_existencia(id_creador: number, estilos: Estilo[]): Promise<string> {
        // Revisa si los datos opcionales están completos
        return this.base_datos.modificar_existencia(id_creador, estilos)
            .then((resultado: string) => {
                return resultado;
            });
    }


// Consulta todos los productos activos
consultar_productos(): Promise < Producto[] > {
    return this.base_datos.consultar_productos()
        .then((producto: Producto[]) => {
            return producto;
        })
}

// Obtiene los datos del producto
consultar_producto(id_producto: number): Promise < Producto > {
    return this.base_datos.consultar_producto(id_producto)
        .then((producto: Producto) => {
            return producto;
        })
}

// Elimina el producto dado
eliminar_producto(id_producto: number): Promise < string > {
    return this.base_datos.eliminar_producto(id_producto);

}

// Elimina el producto dado
eliminar_mi_producto(id_producto: number, id_creador: number): Promise < string > {
    return this.base_datos.eliminar_mi_producto(id_producto, id_creador);

}

//Obtiene productos de un creador de contenido segun su ID
consultar_productos_creador(id_creador_contenido: number): Promise < Producto[] > {
    return this.base_datos.consultar_productos_creador(id_creador_contenido)
        .then((producto: Producto[]) => {
            return producto;
        })
}

// Modifica los datos del producto enviado, cambia la versión y inserta los nuevos datos según la versión
editar_producto(id_producto: number): string {
    return "producto modificado";
}



}