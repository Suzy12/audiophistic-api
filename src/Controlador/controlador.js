"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DAO_1 = __importDefault(require("./DAO"));
class Controlador {
    constructor() {
        this.base_datos = DAO_1.default.get_instancia();
    }
}
exports.default = Controlador;
