import { Client } from "pg";
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";

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

    // Reemplaza la contrasena de un usuario
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<string> {
        try {
            let res = await this.cliente.query('select * from cambiar_contrasena($1,$2)', [id_usuario, contrasena]);
            if (res.rows[0].cambiar_contrasena) {
                return res.rows[0].cambiar_contrasena;
            } else {
                throw new Error("La contraseña no pudo ser cambiada");
            }
        } catch (err) {
            throw err;
        }
    }

    // Reemplaza la contrasena de un usuario pero con mail en lugar de ID
    async cambiar_contrasena_con_mail(correo: string, contrasena: string): Promise<string> {
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
                throw new Error("No se pudo obtener el usuario");
            }

        } catch (err) {
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
                throw new Error("No se pudo obtener el producto");
            }

        } catch (err) {
            throw err;
        }
    }

}



