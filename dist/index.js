"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controlador_1 = __importDefault(require("./Controlador/Controlador"));
const Controlador_Login_1 = __importDefault(require("./Controlador/Controlador_Login"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json({ limit: '10mb' }));
let controlador = new Controlador_1.default();
let controlador_login = new Controlador_Login_1.default();
app.get('/', (req, res) => {
    res.send('Bienvenido a la api de Audiophistic!');
});
app.post('/cambio_contrasena', (req, res) => {
    try {
        var { id_usuario, contrasena } = req.body;
        if (id_usuario && contrasena) {
            controlador.cambiar_contrasena(id_usuario, contrasena)
                .then((resultado) => {
                console.log(resultado);
                if (resultado.error) {
                    return res.send({ error: resultado.error.message });
                }
                else {
                    return res.send({ resultado });
                }
            });
        }
    }
    catch (err) {
        return res.send({ error: "Los tipos de los datos son incorrectos" });
    }
});
app.post('/iniciar_sesion', (req, res) => {
    try {
        var { correo, contrasena } = req.body;
        if (correo && contrasena) {
            controlador_login.verificar_contrasena(correo, contrasena)
                .then((resultado) => {
                if (resultado.error) {
                    return res.send({ error: resultado.error.message });
                }
                else {
                    return res.send({ resultado });
                }
            });
        }
    }
    catch (err) {
        return res.send({ error: "Los tipos de los datos son incorrectos" });
    }
});
app.post('/verificar_token', (req, res) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
        var token = req.headers.authorization.split(' ')[1];
        let resultado = controlador_login.descifrar_token(token);
        console.log(resultado);
        return res.send({ resultado: resultado });
    }
    catch (err) {
        return res.send({ error: "Los tipos de los datos son incorrectos" });
    }
});
app.get('/productos/:id_producto', (req, res) => {
    try {
        let id_producto = parseInt(req.params.id_producto);
        controlador.get_producto(id_producto)
            .then((resultado) => {
            if (resultado.error) {
                return res.send({ error: resultado.error.message });
            }
            else {
                return res.send({ resultado });
            }
        });
    }
    catch (err) {
        return res.send({ error: err.message });
    }
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
