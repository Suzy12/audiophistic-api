"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controlador_1 = __importDefault(require("./src/controlador"));
var app = (0, express_1.default)();
var controlador = new controlador_1.default("Hola");
app.get('/', function (req, res) {
    res.send('Lol!');
});
app.listen(3000, function () {
    console.log('The application is listening on port 3000!');
});
