import express from 'express';
import cors from 'cors';
import Controlador from './Controlador/Controlador';
import Controlador_Acceso from './Controlador/Controlador_Acceso';
import { Tipos_Usuario } from './Modelo/Tipos_Usuario';
import { Producto } from './Modelo/Producto';
import { Estilo } from './Modelo/Estilo';
import { Creador_de_Contenido } from './Modelo/Creador_de_Contenido';
let opciones_cors = {
    origin: ['http://186.176.18.72', 'http://201.194.192.205',
    'http://152.231.200.151','http://localhost:4200', 'https://audiophistic1.web.app'],
    optionsSuccessStatus: 200
}
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json({ limit: '10mb' }));
app.use(cors(opciones_cors))

let controlador = new Controlador();
let controlador_login = new Controlador_Acceso();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("LISTENING ON PORT", PORT);
})


app.get('/', (req, res) => {
    res.send('Bienvenido a la api de Audiophistic!');
})

/* Verifica si hay un token en el request */

function hay_auth(req: express.Request, res: express.Response) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        throw new Error('Falta el header de autorización');
    };
    let token: string[] = req.headers.authorization.split(' ');
    if (token.length < 2) {
        throw new Error('Falta el token de autorización');
    }
    return token;
}


/* Verifican los diferentes tipos de autorizacion que hay */

function autorizacion_admin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let token: string[] = hay_auth(req, res) as string[];
        if (!controlador_login.verificar_permisos(token[1], 1)) {
            return res.send({ error: 'Acceso denegado' });
        } else {
            return next();
        }
    } catch (err: any) {
        return res.send({ error: err.message })
    }
}

function autorizacion_creador_contenido(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let token: string[] = hay_auth(req, res) as string[];
        if (!controlador_login.verificar_permisos(token[1], 2)) {
            return res.send({ error: 'Acceso denegado' });
        } else {
            return next();
        }
    } catch (err: any) {
        return res.send({ error: err.message })
    }
}

function autorizacion_consumidor(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        let token: string[] = hay_auth(req, res) as string[];
        if (!controlador_login.verificar_permisos(token[1], 3)) {
            return res.send({ error: 'Acceso denegado' });
        } else {
            return next();
        }
    } catch (err: any) {
        return res.send({ error: err.message })
    }
}

// Inicio de sesion, se comunica con el controlador login
app.post('/registrar_usuario', (req, res) => {
    try {
        let { correo, nombre, contrasena }: { correo: string, nombre: string, contrasena: string } = req.body;
        if (nombre && correo && contrasena) {
            return controlador.registrar_usuario(correo, nombre, contrasena)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

//Crear usuario, creador de contenido
app.post('/crear_usuario', autorizacion_admin, (req, res) => {
    try {
        let { correo, nombre, caracteristicas }: { correo: string, nombre: string, caracteristicas: Creador_de_Contenido } = req.body;
        if (correo && nombre && caracteristicas) {
            return controlador.crear_usuario(correo, nombre, caracteristicas)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                })
        } else {
            return res.send({ error: "Los datos están incompletos" });
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

app.post('/confirmar_usuario', (req, res) => {
    try {
        let { token }: { token: string } = req.body;
        if (token) {
            return controlador.confirmar_usuario(token)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "El token no fue enviado" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Cambio de contrasena, se comunica con el controlador
app.post('/cambiar_contrasena', (req, res) => {
    try {
        let { contrasena }: { contrasena: string } = req.body;
        let token: string = hay_auth(req, res)[1];
        if (token && contrasena) {
            controlador.cambiar_contrasena(token, contrasena)
                .then((resultado: any) => {
                    return res.send({ resultado });
                })
                .catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
});

// Envio de correo con contrasena temporal
app.post('/recuperar_contrasena', (req, res) => {
    try {
        let { correo }: { correo: string } = req.body;
        if (correo) {
            controlador.crear_contrasena_temporal(correo)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Hubo un error" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Inicio de sesion, se comunica con el controlador login
app.post('/iniciar_sesion', (req, res) => {
    try {
        let { correo, contrasena }: { correo: string, contrasena: string } = req.body;
        if (correo && contrasena) {
            return controlador_login.verificar_contrasena(correo, contrasena)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})


// Editar los datos del usuario
app.post('/editar_usuario', (req, res) => {
    try{
        let { nombre, caracteristicas }: { nombre: string, caracteristicas: Tipos_Usuario } = req.body;
        let token: string = (hay_auth(req, res) as string[])[1];
        if (token && nombre && caracteristicas !== undefined){
            controlador.editar_usuario(token, nombre, caracteristicas)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err:any) {
        return res.send({ error: err.message });
    }
})

/* Devuelve todos los usuarios, se comunica con el controlador, 
    Solo pueden accesar con permisos de administrador */
app.get('/usuarios', autorizacion_admin, (req, res) => {
    try {
        controlador.consultar_usuarios()
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Devuelve todos los datos del usuario, se comunica con el controlador
app.get('/usuarios/:id_usuario', autorizacion_admin, (req, res) => {
    try {
        let id_usuario: number = parseInt(req.params.id_usuario);
        controlador.consultar_usuario(id_usuario)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

app.get('/perfil', (req, res) => {
    try {
        let token: string = (hay_auth(req, res) as string[])[1];
        controlador.consultar_perfil(token)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

//Elimina un usuario
app.get('/eliminar_usuario/:id_usuario', autorizacion_admin, (req: express.Request, res) => {
    try {
        let id_usuario: number = parseInt(req.params.id_usuario);
        controlador.eliminar_usuario(id_usuario)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message })
    }
})

// Inserta un producto y todos sus datos a la base de datos
app.post('/crear_producto', autorizacion_creador_contenido, (req, res) => {
    try {
        let { producto, estilos }: { producto: Producto, estilos: Estilo[] } = req.body;
        let token: string = (hay_auth(req, res) as string[])[1];
        if (producto && estilos && token) {
            controlador.crear_producto(producto, estilos, token)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
});


app.post('/modificar_producto', autorizacion_creador_contenido, (req, res) => {
    try {
        let { producto, estilos }:
            { producto: Producto, estilos: Estilo[] } = req.body
        let token: string = (hay_auth(req, res) as string[])[1];
        if (producto && estilos && token) {
            controlador.modificar_producto(producto, estilos, token)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
});

app.post('/modificar_existencia', autorizacion_creador_contenido, (req, res) => {
    try {
        let { estilos }:
            { estilos: Estilo[] } = req.body
        let token: string = (hay_auth(req, res) as string[])[1];
        if (estilos && token) {
            controlador.modificar_existencia(token, estilos)
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "Los datos están incompletos" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
});

/* Devuelve todos los usuarios, se comunica con el controlador, 
    Solo pueden accesar con permisos de administrador */
app.get('/productos', autorizacion_admin, (req, res) => {
    try {
        controlador.consultar_productos()
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

//Devuelve todos los productos registrados a un Creador de Contenido
app.get('/productos_por_creador/:id_creador_contenido', (req: express.Request, res) => {
    try {
        let id_usuario: number = parseInt(req.params.id_creador_contenido);
        controlador.consultar_productos_creador(id_usuario)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Devuelve los productos que ha creado el usuario dentro del token
app.get('/mis_productos', autorizacion_creador_contenido, (req: express.Request, res) => {
    try {
        let token: string = (hay_auth(req, res) as string[])[1];
        controlador.consultar_productos_usuario(token)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Devuelve todos los datos del usuario, se comunica con el controlador
app.get('/productos/:id_producto', (req: express.Request, res) => {
    try {
        let id_producto: number = parseInt(req.params.id_producto);
        controlador.consultar_producto(id_producto)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Devuelve todos los datos del usuario, se comunica con el controlador
app.get('/eliminar_producto/:id_producto', autorizacion_admin, (req: express.Request, res) => {
    try {
        let id_producto: number = parseInt(req.params.id_producto);
        controlador.eliminar_producto(id_producto)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Devuelve todos los datos del usuario, se comunica con el controlador
app.get('/eliminar_mi_producto/:id_producto', autorizacion_creador_contenido, (req: express.Request, res) => {
    try {
        let id_producto: number = parseInt(req.params.id_producto);
        let token: string = (hay_auth(req, res) as string[])[1];
        controlador.eliminar_mi_producto(id_producto, token)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

// Devuelve todos los datos del usuario, se comunica con el controlador
app.get('/estilos/:id_producto', (req: express.Request, res) => {
    try {
        let id_producto: number = parseInt(req.params.id_producto);
        controlador.consultar_estilos(id_producto)
            .then((resultado: any) => {
                return res.send({ resultado });
            }).catch((err: any) => {
                return res.send({ error: err.message });
            });
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})

//crear una nueva categoria
app.post('/crear_categoria', autorizacion_admin, (req,res) => {
    try {
        let {nombre/*, fecha_creacion, cant_blogs*/}: { nombre: string/*, fecha_creacion: Date, cant_blogs: number*/} = req.body;
        if (nombre){
            controlador.crear_categoria(nombre, /*fecha_creacion, cant_blogs*/)
                .then((resultado: any) => {
                    return res.send({resultado});
                }).catch((err: any) => {
                    return res.send ({error: err.message})
                })
        }else{
            return res.send({ error: "No se pudo crear Categoria"})
        }

    } catch (err:any){
        return res.send({ error: err.message });
    }
});

//devuelve todas las categorias
app.get('/categorias', autorizacion_admin, (req,res) => {
    try{
        controlador.consultar_categorias()
        .then((resultado: any)=>{
            return res.send({resultado});
        }).catch((err:any) => {
            return res.send({error: err.message})
        });
    }catch(err: any) {
        return res.send({ error: err.message });
    }
});

//devuelve todas las categorias
app.get('/eliminar_categoria/:id_categoria', autorizacion_admin, (req,res) => {
    try{
        let id_categoria : number = parseInt(req.params.id_categoria);
        controlador.eliminar_categoria(id_categoria)
        .then((resultado: any)=>{
            return res.send({resultado});
        }).catch((err:any) => {
            return res.send({error: err.message})
        });
    }catch(err: any) {
        return res.send({ error: err.message });
    }
});

// Inicio de sesion, se comunica con el controlador login
app.post('/validar_tipo_token', (req, res) => {
    try {
        let { token, id_tipo }: { token: string, id_tipo: string } = req.body;
        if (token && id_tipo) {
            return controlador_login.validar_tipo(token, parseInt(id_tipo))
                .then((resultado: any) => {
                    return res.send({ resultado });
                }).catch((err: any) => {
                    return res.send({ error: err.message });
                });
        } else {
            return res.send({ error: "El token no fue enviado" })
        }
    } catch (err: any) {
        return res.send({ error: err.message });
    }
})
