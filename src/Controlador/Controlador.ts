import fs from 'fs';
import util from 'util'
import generator, { generate } from 'generate-password'
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import Enviador_Correos from "./Enviador_Correos";
import bcrypt from 'bcrypt';
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";
import Manejador_Tokens from './Manejador_Tokens';
import { strict } from 'assert/strict';

/* Se encarga de coordinar las funcionalidades 
   De la pagina web con sus clases respectivas*/
export default class Controlador {
    private envio_correos: Enviador_Correos;
    private gestor_productos: Gestor_Prodcuctos;
    private gestor_usuarios: Gestor_Usuarios;
    private manejador_tokens: Manejador_Tokens
    //El numero de salts para el hash
    private salts = 10;

    constructor() {
        this.envio_correos = Enviador_Correos.get_instancia();
        this.manejador_tokens = Manejador_Tokens.get_instancia();
        this.gestor_productos = new Gestor_Prodcuctos();
        this.gestor_usuarios = new Gestor_Usuarios();
    }

 
    // Registra a un consumidor
    async registrar_usuario(nombre: string, correo: string, contrasena: string): Promise<string> {
        //Genera el hash y guarda al usuario en la base de datos
        let hash: string = bcrypt.hashSync(contrasena, this.salts);
        let id: number = await this.gestor_usuarios.registrar_usuario(nombre,correo,hash);

        //Genera el token y lo adjunta al correo
        let token = this.manejador_tokens.crear_token_registro(id);
        let link = `http://localhost:4200/cuenta?token=${token}`
        console.log(token, link);
        let html: string = fs.readFileSync('assets/html/correo_activar.html',
            { encoding: 'utf8', flag: 'r' });
        html = util.format(html, link, link, link);
        return this.envio_correos.enviar_correo(correo, 'Confirmar cuenta — Audiophistic', html);
    }


    //Genera la confirmacion del correo
    confirmar_usuario(token: string): Promise<string>{
        let id_usuario = this.manejador_tokens.verificar_token_registro(token);
        return this.gestor_usuarios.confirmar_usuario(id_usuario);
    }

    // Consulta todos los productos
    consultar_productos(): Promise<Producto[]> {
        return this.gestor_productos.consultar_productos();
    }

    // Consulta los datos del producto respectivo
    consultar_producto(id_producto: number): Promise<Producto> {
        return this.gestor_productos.consultar_producto(id_producto);
    }

    // Consulta todos los usuarios
    consultar_usuarios(): Promise<Usuario[]> {
        return this.gestor_usuarios.consultar_usuarios();
    }

    // Consulta los datos del usuario
    consultar_usuario(id_usuario: number): Promise<Usuario> {
        return this.gestor_usuarios.consultar_usuario(id_usuario);
    }

    // Cambia la contrasena del usuario con los datos dados
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{ resultado: string }> {
        let hash: string = bcrypt.hashSync(contrasena, this.salts);
        return this.gestor_usuarios.cambiar_contrasena(id_usuario, hash);
    }

    // Crea una nueva contrasena, la guarda y envia un correo con la contrasena
    async crear_contrasena_temporal(correo: string): Promise<string>{
        var contrasena_temporal : string = this.generacion_contrasena();

        // Guarda la contrasena temporal en la base
        let hash: string = bcrypt.hashSync(contrasena_temporal, this.salts);
        await this.gestor_usuarios.cambiar_contrasena_con_correo(correo, hash);
        // Integra la nueva contrasena al correo y lo envia
        var cuerpo_correo : string = fs.readFileSync('./assets/correo_recuperar.html',
        { encoding: 'utf8', flag: 'r' });
        cuerpo_correo = util.format(cuerpo_correo, contrasena_temporal);
        return this.envio_correos.enviar_correo(correo, "AudioPhistic: PASSWPORD TEMPORAL", cuerpo_correo);
        
    }

    // Funcion para generar un string aleatorio para la recuperacion de contrasenias
    generacion_contrasena(): string {
        return generator.generate({
            length: 10,
            symbols: true,
            numbers: true,
            strict: true
        })

    }
}