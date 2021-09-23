import { Client } from "pg";
import { Estilo } from "../Modelo/Estilo";
import { Producto } from "../Modelo/Producto";
import { Tipos_Producto } from "../Modelo/Tipos_Producto";
import { Tipos_Usuario } from "../Modelo/Tipos_Usuario";
import { Usuario } from "../Modelo/Usuario";
import { Categoria } from "../Modelo/Categoria";

require('dotenv').config();

const connection = { //Se ponen todos los parametros en el archivo .env por seguridad
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

/*Clase basada en el modelo de Singleton, 
  se encarga de la conexion a la base de datos de postgres */
export default class DAO {
    cliente: Client

    private static instancia: DAO;

    private constructor() {
        this.cliente = new Client(connection);
        try {
            this.cliente.connect();
        } catch (err) {
            console.log(err)
        }
    }

    static get_instancia() {
        if (!DAO.instancia) {
            DAO.instancia = new DAO();
        }
        return DAO.instancia;
    }

    // Comprueba que el tipo de usuario exista
    async existe_tipo_usuario(id_tipo: number): Promise<number> {
        try {
            let res = await this.cliente.query('select * from existe_tipo_usuario($1)',
                [id_tipo]);
            if (res) {
                return res.rows[0].existe_tipo_usuario;
            } else {
                throw new Error("No se pudo verificar el tipo");
            }
        } catch (err) {
            throw err;
        }
    }

    // Registra a un usuario CONSUMIDOR
    async registrar_usuario(correo: string, nombre: string, contrasena: string): Promise<number> {
        try {
            let res = await this.cliente.query('select * from registrar_usuario($1,$2,$3)',
                [correo, nombre, contrasena]);
            if (res.rows[0]) {
                return res.rows[0].registrar_usuario;
            } else {
                throw new Error("No se pudo resgistrar al usuario");
            }
        } catch (err) {
            throw err;
        }
    }

    //se crea un usuario consumidor
    async crear_usuario(tipo_usuario: number, correo: string, nombre: string, contrasena: string, caracteristicas: Tipos_Usuario): Promise<string>{
        try{
            let res = await this.cliente.query('select * from crear_usuario($1,$2,$3,$4,$5)',
                [tipo_usuario, correo, nombre, contrasena, caracteristicas]);
            if (res.rows[0]){
                return res.rows[0].crear_usuario;
            }else {
                throw new Error("No Se pudo registrar al usuario")
            }

        } catch (err){
            throw err;
        }
    }

    //se crea una categoria
    async crear_categoria(nombre: string/*, fecha_creacion: Date, cant_blogs: number*/): Promise<string>{
        try{
            let res = await this.cliente.query('select * from crear_categoria($1)', [nombre/*, fecha_creacion, cant_blogs*/]);
            if (res.rows[0]){
                return res.rows[0].crear_categoria;
            } else{
                throw new Error("No se pudo crear la categoria");
            }

        }catch (err){
            throw err;
        }
    }

    //get categorias
    async get_categorias(): Promise<string>{
        try{
            let res= await this.cliente.query('select * from get_categorias()');
            if (res.rows[0]){
                return res.rows[0].get_categorias;
            } else{
                throw new Error("No se pudieron traer las categorias ");
            }

        }catch (err){
            throw err;
        }
    }

    // Reemplaza la contrasena de un usuario pero con mail en lugar de ID
    async cambiar_contrasena_con_correo(correo: string, contrasena: string): Promise<string> {
        try {
            let res = await this.cliente.query('select * from cambiar_contrasena($1,$2)', [correo, contrasena]);
            if (res.rows[0].cambiar_contrasena) {
                return res.rows[0].cambiar_contrasena;
            } else {
                throw new Error("La contraseña no pudo ser cambiada");
            }
        } catch (err) {
            throw err;
        }
    }

    // Confirma un usuario CONSUMIDOR
    async confirmar_usuario(id_usuario: number): Promise<string> {
        try {
            let res = await this.cliente.query('select * from confirmar_usuario($1)',
                [id_usuario]);
            if (res) {
                return res.rows[0].confirmar_usuario;
            } else {
                throw new Error("No se pudo confirmar al usuario");
            }
        } catch (err) {
            throw err;
        }
    }

    // Recupera a un usuario segun su correo
    async verificar_usuario(correo: string): Promise<Usuario> {
        try {
            let res = await this.cliente.query('select * from verificar_usuario($1)', [correo]);
            if (res.rows[0]) {
                return res.rows[0];
            } else {
                throw new Error("No se pudo obtener el usuario");
            }
        } catch (err) {
            throw err;
        }
    }

    // Reemplaza la contrasena de un usuario
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<string> {
        try {
            let res = await this.cliente.query('select * from cambiar_contrasena($1::int,$2::character varying(60))', [id_usuario, contrasena]);
            if (res.rows[0].cambiar_contrasena) {
                return res.rows[0].cambiar_contrasena;
            } else {
                throw new Error("La contraseña no pudo ser cambiada");
            }
        } catch (err) {
            throw err;
        }
    }

    // Recupera todos los usuarios confirmados y activos
    async consultar_usuarios(): Promise<Usuario[]> {
        try {
            let res = await this.cliente.query('select * from consultar_usuarios()');
            if (res.rows[0]) {
                return res.rows;
            } else {
                throw new Error("No se pudieron obtener los usuarios");
            }
        } catch (err) {
            throw err;
        }
    }

    // Recupera un usuario y sus datos segun su id
    async consultar_usuario(id_usuario: number): Promise<Usuario> {
        try {
            let res = await this.cliente.query('select * from consultar_usuario($1)', [id_usuario]);
            if (res.rows[0]) {
                return res.rows[0];
            } else {
                throw new Error("El usuario no existe, no ha sido confirmado o fue eliminado");
            }
        } catch (err) {
            throw err;
        }
    }

    // Crea un producto con los datos dados
    async crear_producto(id_creador: number, id_tipo: number, fecha_lanzamiento: number,
        titulo: string, precio: number, tiempo_envio: number, descripcion: string, 
            caracteristicas: Tipos_Producto,
        estilos: Estilo[]): Promise<string> {
        try {
            let res = await this.cliente.query('select * from crear_producto($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [id_creador, id_tipo, fecha_lanzamiento, titulo, precio, tiempo_envio, 
                    descripcion, caracteristicas, estilos]);
            if (res.rows[0]) {
                return res.rows[0].crear_producto;
            } else {
                throw new Error("No se pudo insertar el producto");
            }
        } catch (err) {
            throw err;
        }
    }

    // Inserta el producto con los cambios dados
    async modificar_producto(id_producto: number, id_creador: number, fecha_lanzamiento: number,
        titulo: string, precio: number, tiempo_envio: number, descripcion: string, 
            caracteristicas: Tipos_Producto,
        estilos: Estilo[]): Promise<string> {
        try {
            let res = await this.cliente.query('select * from modificar_producto($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [id_producto, id_creador, fecha_lanzamiento, titulo, precio, tiempo_envio, 
                    descripcion, caracteristicas, estilos]);
            if (res.rows[0]) {
                return res.rows[0].modificar_producto;
            } else {
                throw new Error("No se pudo insertar el producto");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // Recupera todos los productos activos
    async consultar_productos(): Promise<Producto[]> {
        try {
            let res = await this.cliente.query('select * from consultar_productos()');
            if (res.rows[0]) {
                return res.rows;
            } else {
                throw new Error("No se pudieron obtener los productos");
            }
        } catch (err) {
            throw err;
        }
    }

    // Recupera un producto y sus datos segun su id
    async consultar_producto(id_producto: number): Promise<Producto> {
        try {
            let res = await this.cliente.query('select * from consultar_producto($1)', [id_producto]);
            if (res.rows[0]) {
                return res.rows[0];
            } else {
                throw new Error("El producto no existe o fue eliminado");
            }
        } catch (err) {
            throw err;
        }
    }

    //Consulta los productos de un Creador de Contenido segun su ID
    async consultar_productos_creador(id_creador_contenido: number): Promise<Producto[]> {
        try {
            let res = await this.cliente.query('select * from consultar_productos_por_creador($1)', [id_creador_contenido]);
            if (res.rows[0]) {
                return res.rows;
            } else {
                throw new Error("El usuario no tiene productos");
            }
        } catch (err) {
            throw err;
        }
    }
    // Cambia el estado de un producto a inactivo
    async eliminar_producto(id_producto: number): Promise<string> {
        try {
            let res = await this.cliente.query('select * from eliminar_producto($1)', [id_producto]);
            if (res.rows[0]) {
                return res.rows[0].eliminar_producto;
            } else {
                throw new Error("El producto no pudo ser eliminado");
            }
        } catch (err) {
            throw err;
        }
    }

    // Cambia el estado de un producto del creador a inactivo
    async eliminar_mi_producto(id_producto: number, id_creador: number): Promise<string> {
        try {
            let res = await this.cliente.query('select * from eliminar_mi_producto($1, $2)', 
            [id_producto, id_creador]);
            if (res.rows[0]) {
                return res.rows[0].eliminar_mi_producto;
            } else {
                throw new Error("El producto no pudo ser eliminado");
            }
        } catch (err) {
            throw err;
        }
    }

    // Eliminación de usuario. Este es un borrado lógico y NO físico. 
    async eliminar_usuario(id_usuario: number): Promise<string> {
        try {
            let res = await this.cliente.query('select * from eliminar_usuario($1)', [id_usuario]);
            if (res.rows[0]) {
                return ("El usuario ha sido desactivado");
            } else {
                throw new Error("el usuario no se ha podido eliminar");
            }
        } catch (err) {
            throw err;
        }
    }

    // Recupera un producto y sus datos segun su id
    async consultar_estilos(id_producto: number): Promise<Estilo[]> {
        try {
            let res = await this.cliente.query('select * from consultar_estilos_producto($1)', [id_producto]);
            if (res.rows[0]) {
                return res.rows;
            } else {
                throw new Error("El producto no existe o fue eliminado");
            }
        } catch (err) {
            throw err;
        }
    }

}



