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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("./DAO"));
const bcrypt = require('bcrypt');
class Gestor_Usuarios {
    constructor() {
        this.base_datos = DAO_1.default.get_instancia();
    }
    crear_usuario(id_usuario, nombre, email) {
        return "usuario creado";
    }
    eliminar_usuario(id_usuairo) {
        return "usuario eliminado";
    }
    // Crea el hash y llama a cambiar la contraseña a la base
    cambiar_contrasena(id_usuario, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            let hash = yield bcrypt.hash(contrasena, Gestor_Usuarios.salts);
            let resultado = yield this.base_datos.cambiar_contrasena(id_usuario, hash);
            return { resultado };
        });
    }
    consultar_usuario(id_usuario) {
        return this.base_datos.obtener_usuario(id_usuario).then((usuario) => {
            return usuario;
        })
            .catch((err) => {
            throw err;
        });
    }
    editar_usuario(id_usuairo) {
        return "usuario modificado";
    }
}
exports.default = Gestor_Usuarios;
// El numero de salts para el cifrado de la contrasena
Gestor_Usuarios.salts = 10;
