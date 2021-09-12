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

    async obtener_usuario(id_usuario: number): Promise<Usuario>{
        try{
            let res = await this.cliente.query('select * from obtener_usuario($1)',[id_usuario]);
            if (res.rows[0]) {
                return res.rows[0];
            } else {
                throw new Error("No se pudo obtener el usuario");
            }

        }catch (err){
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

    /*
    async get_producto(correo: string): Promise<Producto> { //dummy de producto
        try {
            let res = {
                rows: [{
                    id_producto: 1, id_creador: 2, titulo: "wh-1000xm4",
                    precio: 140000, tipo: {
                        id_tipo: 1, marca: "Sony", conexion: "Bluetooth", tipo: "Over-Ear"
                    }
                }]
            };
            if (res.rows[0]) {
                return res.rows[0];
            } else {
                throw new Error("El producto no existe");
            }
        } catch (err) {
            throw err;
        }
    }

    async get_usuario(id: number): Promise<Usuario>{ //dummy de usuario
        try{
            let res = {
                rows: [{
                    id_usuario: 2, nombre: "Boaty McBoatface",
                    email: "boats@boats.com", tipo:{
                        id_tipo: 2, direccion_exacta: "el mar", canton:"Carillo", Provincia:"Guanacaste",celular:"88888888"
                    }
                }]
            };
            if (res.rows[0]){
                return res.rows[0];
            } else {
                throw new Error("El Usuario no existe")
            }
        }catch(err){
            throw err;
        }

    }*/


}



