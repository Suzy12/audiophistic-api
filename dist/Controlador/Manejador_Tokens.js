"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
//Clase basada en el modelo de Singleton, se encarga del manejo de los tokens
class Manejador_Tokens {
    constructor() {
    }
    static get_instancia() {
        if (!Manejador_Tokens.instancia) {
            Manejador_Tokens.instancia = new Manejador_Tokens();
        }
        return Manejador_Tokens.instancia;
    }
    crear_token(id_usuario, correo, id_tipo) {
        var token = jsonwebtoken_1.default.sign({ id_usuario, correo, tipo: { id_tipo } }, Manejador_Tokens.secreto, { expiresIn: '365 days' });
        return { token };
    }
    descifrar_token(token) {
        let objeto = jsonwebtoken_1.default.verify(token, Manejador_Tokens.secreto);
        return { id_usuario: objeto.id_usuario, email: objeto.correo, tipo: objeto.tipo };
    }
}
exports.default = Manejador_Tokens;
Manejador_Tokens.secreto = process.env.TOKEN_SECRET;
