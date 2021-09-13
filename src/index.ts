import express from 'express';
import Controlador from './Controlador/Controlador';
import Controlador_login from './Controlador/Controlador_Login';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json({ limit: '10mb' }));

let controlador = new Controlador();
let controlador_login = new Controlador_login();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("LISTENING ON PORT", PORT);
})


app.get('/', (req, res) => {
    res.send('Bienvenido a la api de Audiophistic!');
})

//cambio de contrasenia, se comunica con el controlador
app.post('/cambio_contrasena', (req, res) => {
    try {
        var { id_usuario, contrasena }: { id_usuario: number, contrasena: string } = req.body;
        if (id_usuario && contrasena) {
            controlador.cambiar_contrasena(id_usuario, contrasena)
                .then((resultado: any) => {
                    return res.send(resultado);
                })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
});

//inicio de sesion, se comunica con el controlador login
app.post('/iniciar_sesion', (req, res) => {
    try {
        var { correo, contrasena }: { correo: string, contrasena: string } = req.body;
        if (correo && contrasena) {
            return controlador_login.verificar_contrasena(correo, contrasena)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

/* Eliminar en cuanto comencemos a comprobar tokens */
app.post('/verificar_token', (req, res) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            return res.status(401).json({ message: 'Missing Authorization Header' });
        }
        return res.send({respuesta:controlador_login.verificar_token(req.headers.authorization)});
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

//Trae el consulta el producto, se comunica con el controlador
app.get('/productos/:id_producto', (req, res) => {
    try {
        let id_producto: number = parseInt(req.params.id_producto);
        controlador.get_producto(id_producto)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch( (err: any) => {
                return res.send({ error: err.message });
            })
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

//Trae el producto se comunica con el controlador
app.get('/usuarios/:id_usuario', (req, res) =>{
    try{
        let id_usuario: number = parseInt(req.params.id_usuario);
        controlador.get_usuario(id_usuario)
        .then((resultado: any) => {
            return res.send({ resultado });
        }).catch( (err: any) => {
            return res.send({ error: err.message });
        })
    } catch(err:any){
        return res.send({ error: err.message });
    }
})