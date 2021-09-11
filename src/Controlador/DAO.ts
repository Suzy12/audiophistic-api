import { Client } from "pg";
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";
require('dotenv').config();

const connection = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

//Clase basada en el modelo de Singleton, se encarga de la conexion a la base de datos de postgres
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

    async obtener_producto(id_producto: number): Promise<Producto>{
        try{
            let res = await this.cliente.query('select * from obtener_producto($1)',[id_producto]);
            if (res.rows[0]) {
                return res.rows[0];
            } else {
                throw new Error("No se pudo obtener el producto");
            }

        }catch (err){
            throw err;
        }

    }

}



