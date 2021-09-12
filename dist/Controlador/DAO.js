"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
//Clase basada en el modelo de Singleton, se encarga de la conexion a la base de datos de postgres
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this.cliente.query('select * from cambiar_contrasena($1::int,$2::character varying(60))', [id_usuario, contrasena]);
                if (res.rows[0].cambiar_contrasena) {
                    return res.rows[0].cambiar_contrasena;
                }
                else {
                    throw new Error("La contraseña no pudo ser cambiada");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    verificar_usuario(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this.cliente.query('select * from verificar_usuario($1)', [correo]);
                if (res.rows[0]) {
                    return res.rows[0];
                }
                else {
                    throw new Error("No se pudo obtener el usuario");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    obtener_usuario(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this.cliente.query('select * from obtener_usuario($1)', [id_usuario]);
                if (res.rows[0]) {
                    return res.rows[0];
                }
                else {
                    throw new Error("No se pudo obtener el usuario");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    obtener_producto(id_producto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield this.cliente.query('select * from obtener_producto($1)', [id_producto]);
                if (res.rows[0]) {
                    return res.rows[0];
                }
                else {
                    throw new Error("No se pudo obtener el producto");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = DAO;
