"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controlador_1 = __importDefault(require("./src/Controlador/controlador"));
const controlador_login_1 = __importDefault(require("./src/Controlador/controlador_login"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json());
let controlador = new controlador_1.default();
let controlador_login = new controlador_login_1.default();
app.get('/', (req, res) => {
    res.send('Lol!');
});
app.post('/cambio_contrasena', (req, res) => {
    try {
        var { id_usuario, contrasena } = req.body; //: { id_usuario: number, contrasena: String } = req.body;
        if (id_usuario && contrasena) {
            controlador_login.cambiar_contrasena(id_usuario, contrasena)
                .then((resultado) => {
                console.log(resultado);
                if (resultado.error) {
                    return res.send({ error: resultado.error.message });
                }
                else {
                    return res.send(resultado);
                }
            });
        }
    }
    catch (err) {
        return res.send({ error: "Los tipos de los datos son incorrectos" });
    }
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
