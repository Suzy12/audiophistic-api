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
class Controlador_login {
    constructor() {
        this.salts = 10;
        this.base_datos = DAO_1.default.get_instancia();
    }
    verificar_contrasena(correo, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            let datosUsuario = yield this.base_datos.obtener_usuario(correo);
            if (datosUsuario.error) {
                return datosUsuario;
            }
            console.log(datosUsuario);
            let misma_contrasena = yield bcrypt.compare(contrasena, datosUsuario.contrasena);
            if (misma_contrasena) {
                return this.crear_token(1, "correo", 1);
            }
            else {
                return { error: { message: "La contraseña es incorrecta" } };
            }
        });
    }
    crear_token(id_usuario, correo, id_tipo) {
        return { token: "mi token" };
    }
    cambiar_contrasena(id_usuario, contrasena) {
        return bcrypt.hash(contrasena, this.salts)
            .then((hash) => {
            return this.base_datos.cambiar_contrasena(id_usuario, hash);
        });
    }
}
exports.default = Controlador_login;
