"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const secreto = process.env.TOKEN_SECRET;
class Manejador_Tokens {
    constructor() {
    }
    crear_token(id_usuario, correo, id_tipo) {
        /*var imprime: string= jwt.sign({
            data: id_usuario, correo, id_tipo
          }, secreto, { expiresIn: '1000h' });

        return {token: imprime};*/
        return { token: "mi token" };
    }
}
exports.default = Manejador_Tokens;
