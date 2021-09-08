"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("./DAO"));
const bcrypt = require('bcrypt');
class Controlador {
    constructor() {
        this.salts = 10;
        this.base_datos = DAO_1.default.get_instancia();
    }
    cambiar_contrasena(id_usuario, contrasena) {
        return bcrypt.hash(contrasena, this.salts)
            .then((hash) => {
            return { resultado: this.base_datos.cambiar_contrasena(id_usuario, hash) };
        });
    }
    crear_token(id_usuario, correo, id_tipo) {
    }
}
exports.default = Controlador;
