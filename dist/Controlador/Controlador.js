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
const Gestor_Usuarios_1 = __importDefault(require("./Gestor_Usuarios"));
const Gestor_Productos_1 = __importDefault(require("./Gestor_Productos"));
class Controlador {
    //private controlador_login: Controlador_login;
    //private gUsuario: Gestor_Usuarios;
    constructor() {
        this.base_datos = DAO_1.default.get_instancia();
        this.gestor_productos = new Gestor_Productos_1.default();
        this.gestor_usaurios = new Gestor_Usuarios_1.default();
    }
    cambiar_contrasena(id_usuario, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gestor_usaurios.cambiar_contrasena(id_usuario, contrasena);
        });
    }
    get_producto(id_producto) {
        return this.base_datos.obtener_producto(id_producto).then((producto) => {
            return producto;
        });
    }
    get_usuario(id_usuario) {
        return this.base_datos.obtener_usuario(id_usuario).then((usuario) => {
            return usuario;
        });
    }
}
exports.default = Controlador;
