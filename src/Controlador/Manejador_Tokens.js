"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
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
        var imprime = jsonwebtoken_1.default.sign({ id_usuario, correo, id_tipo }, Manejador_Tokens.secreto, { expiresIn: '1000h' });
        return { token: imprime };
    }
    descifrar_token(token) {
        return jsonwebtoken_1.default.verify(token, Manejador_Tokens.secreto);
    }
}
exports.default = Manejador_Tokens;
Manejador_Tokens.secreto = process.env.TOKEN_SECRET;
