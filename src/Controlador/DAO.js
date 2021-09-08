"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
const connection = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: { rejectUnauthorized: false }
};
class DAO {
    constructor() {
        this.cliente = new pg_1.Client(connection);
        try {
            this.cliente.connect();
        }
        catch (err) {
            console.log(err);
        }
    }
    static get_instancia() {
        if (!DAO.instancia) {
            DAO.instancia = new DAO();
        }
        return DAO.instancia;
    }
    cambiar_contrasena(id_usuario, contrasena) {
        return this.cliente.query('select * from cambiar_contrasena($1::int,$2::character varying(60))', [id_usuario, contrasena])
            .then(res => {
            if (res.rows[0].cambiar_contrasena) {
                return res.rows[0].cambiar_contrasena;
            }
            else {
                return { error: { message: "No se pudo cambiar la contraseña" } };
            }
        })
            .catch(err => {
            return { error: err };
        });
    }
    obtener_usuario(correo) {
        return this.cliente.query('select * from obtener_usuario($1::character varying(60))', [correo])
            .then(res => {
            if (res.rows[0]) {
                return res.rows[0];
            }
            else {
                return { error: { message: "No se pudo cambiar la contraseña" } };
            }
        })
            .catch(err => {
            return { error: err };
        });
    }
}
exports.default = DAO;
