"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("./DAO"));
class Gestor_Prodcuctos {
    constructor() {
        this.base_datos = DAO_1.default.get_instancia();
    }
    crear_producto(muchas_cosas) {
        return "producto creado";
    }
    eliminar_usuario(id_producto) {
        return "producto eliminado";
    }
    consultar_usuario(id_producto) {
        return this.base_datos.obtener_producto(id_producto).then((producto) => {
            return producto;
        });
    }
    editar_usuario(id_producto) {
        return "producto modificado";
    }
}
exports.default = Gestor_Prodcuctos;
