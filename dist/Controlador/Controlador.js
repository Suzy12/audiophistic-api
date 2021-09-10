"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("./DAO"));
const bcrypt = require('bcrypt');
class Controlador {
    constructor() {
        this.base_datos = DAO_1.default.get_instancia();
    }
    cambiar_contrasena(id_usuario, contrasena) {
        return bcrypt.hash(contrasena, Controlador.salts)
            .then((hash) => {
            return { resultado: this.base_datos.cambiar_contrasena(id_usuario, hash) };
        });
    }
    get_producto(id_producto) {
        return Promise.resolve({ resultado: "Todo bien" });
        //return gestor_productos.get_producto(id_producto);
    }
}
exports.default = Controlador;
Controlador.salts = 10;
