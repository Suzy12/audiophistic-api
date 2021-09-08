import { error } from 'console';
import express from 'express';
import Controlador from './src/Controlador/Controlador';
import Controlador_login from './src/Controlador/Controlador_Login';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());

let controlador = new Controlador();
let controlador_login = new Controlador_login();

app.get('/', (req, res) => {
    res.send('Lol!');
})

app.post('/cambio_contrasena', (req, res) => {
    try {
        var { id_usuario, contrasena }: { id_usuario: number, contrasena: string } = req.body;
        if (id_usuario && contrasena) {
            controlador.cambiar_contrasena(id_usuario, contrasena)
                .then((resultado: any) => {
                    console.log(resultado);
                    if (resultado.error) {
                        return res.send({ error: resultado.error.message });
                    } else {
                        return res.send({resultado});
                    }
                })
        }
    } catch (err) {
        return res.send({ error: "Los tipos de los datos son incorrectos" });
    }
});

app.post('/iniciar_sesion', (req, res) => {
    try {
        var { correo, contrasena }: { correo: string, contrasena: string } = req.body;
        if (correo && contrasena) {
            controlador_login.verificar_contrasena(correo, contrasena)
                .then((resultado: any) => {
                    if (resultado.error) {
                        return res.send({ error: resultado.error.message });
                    } else {
                        return res.send({resultado});
                    }
                })
        }
    } catch (err) {
        return res.send({ error: "Los tipos de los datos son incorrectos" });
    }
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})