import fs from 'fs';
import util from 'util'
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";
import Envio_Mails from "./Envio_Mails";
import Manejador_Tokens from './Manejador_Tokens';

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

    // Funcion para generar un string aleatorio para la recuperacion de contrasenias
    generacion_contrasena(): string {
        var randomstring = Math.random() //genera un numero aleatorio
            .toString(36) //lo comnvierte a base -36
            .slice(-8); //corta los ultimos 8 caracteres
        return randomstring;

    }
}
