import fs from 'fs';
import util from 'util'
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import Envio_Mails from "./Envio_Mails";
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";

/* Se encarga de coordinar las funcionalidades 
   De la pagina web con sus clases respectivas*/
export default class Controlador {
    private envio_correos: Envio_Mails;
    private gestor_productos: Gestor_Prodcuctos;
    private gestor_usuarios: Gestor_Usuarios;
    private manejador_tokens: Manejador_Tokens

    constructor() {
        this.envio_correos = Envio_Mails.get_instancia();
        this.manejador_tokens = Manejador_Tokens.get_instancia();
        this.gestor_productos = new Gestor_Prodcuctos();
        this.gestor_usuarios = new Gestor_Usuarios();
    }

    async registrar_usuario(nombre: string, correo: string, contrasena: string): Promise<string> {
        //let id: number = await this.gestor_usuarios.registrar_usuario(nombre,correo,contrasena);
        let token = this.manejador_tokens.crear_token_registro(3);
        let link = `http://localhost:4200/cuenta?token=${token}`
        console.log(token, link);
        let html: string = fs.readFileSync('assets/html/correo_activar.html',
            { encoding: 'utf8', flag: 'r' });
        html = util.format(html, link, link, link);
        return this.envio_correos.enviar_correo(correo, 'Confirmar cuenta — Audiophistic', html);
    }

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
        return this.gestor_usuarios.cambiar_contrasena(id_usuario, contrasena);
    }

    //le asigna la contrasenia temporal al usuario y la guarda en la DB
    /*async enviar_contrasena_temporal(correo: string): Promise<{ resultado: string }>{
        //var correo= (await this.gestor_usaurios.consultar_usuario(id_usuario)).email;
        var password_temporal= this.generacion_contrasena();
        //se lee el archivo HTML
        var cuerpo_correo = fs.readFileSync('./assets/correo_recuperar.html',
        { encoding: 'utf8', flag: 'r' });
        //se agrega el password temporal al archivo HTML, para enviar el correo
        cuerpo_correo.replace('$1',util.format('%s:%s', password_temporal));
        this.envio_mails.enviar_correo(correo, "AudioPhistic: PASSWPORD TEMPORAL", cuerpo_correo);
        //cambia el password temporal en la BD
        return this.gestor_usaurios.cambiar_contrasena_con_mail(correo, cuerpo_correo);
        
    }*/

    //de prueba donde no mete la nueva contrasena a la BD
    async enviar_contrasena_temporal(correo: string): Promise<string>{
        var password_temporal : string = this.generacion_contrasena();
        //se lee el archivo HTML
        var cuerpo_correo : string = fs.readFileSync('./assets/correo_recuperar.html',
        { encoding: 'utf8', flag: 'r' });
        //se agrega el password temporal al archivo HTML, para enviar el correo
        cuerpo_correo = util.format(cuerpo_correo, password_temporal);
        console.log(password_temporal);
        //cambia el password temporal en la BD
        await this.gestor_usaurios.cambiar_contrasena_con_mail(correo, cuerpo_correo);
        return this.envio_mails.enviar_correo(correo, "AudioPhistic: PASSWPORD TEMPORAL", cuerpo_correo);
        
    }

    // Funcion para generar un string aleatorio para la recuperacion de contrasenias
    generacion_contrasena(): string {
        var randomstring = Math.random() //genera un numero aleatorio
            .toString(36) //lo comnvierte a base -36
            .slice(-10); //corta los ultimos 10 caracteres
        console.log(randomstring);
        return randomstring;

    }
}