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
class Controlador {
    constructor() {
        this.base_datos = DAO_1.default.get_instancia();
    }
    cambiar_contrasena(id_usuario, contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            let hash = yield bcrypt.hash(contrasena, Controlador.salts);
            let resultado = yield this.base_datos.cambiar_contrasena(id_usuario, hash);
            return { resultado };
        });
    }
    get_producto(id_producto) {
        return Promise.resolve({ resultado: "Todo bien" });
    }
}
exports.default = Controlador;
Controlador.salts = 10;
