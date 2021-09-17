import fs from 'fs';
import util from 'util'
import generator from 'generate-password'
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import Enviador_Correos from "./Enviador_Correos";
import bcrypt from 'bcrypt';
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";
import Manejador_Tokens from './Manejador_Tokens';
import Gestor_Estilos from './Gestor_Estilos';
import { Estilo } from '../Modelo/Estilo';
import { Tipos_Usuario } from '../Modelo/Tipos_Usuario';

/* Se encarga de coordinar las funcionalidades 
   De la pagina web con sus clases respectivas*/
export default class Controlador {
    private envio_correos: Enviador_Correos;
    private manejador_token: Manejador_Tokens;
    private gestor_productos: Gestor_Prodcuctos;
    private gestor_usuarios: Gestor_Usuarios;
    private gestor_estilos: Gestor_Estilos;
    //El numero de salts para el hash
    private salts = 10;

    constructor() {
        this.envio_correos = Enviador_Correos.get_instancia();
        this.manejador_token = Manejador_Tokens.get_instancia();
        this.gestor_productos = new Gestor_Prodcuctos();
        this.gestor_usuarios = new Gestor_Usuarios();
        this.gestor_estilos = new Gestor_Estilos();
    }


    // Registra a un consumidor
    async registrar_usuario(correo: string, nombre: string, contrasena: string): Promise<string> {
        //Genera el hash y guarda al usuario en la base de datos
        let hash: string = bcrypt.hashSync(contrasena, this.salts);
        let id: number = await this.gestor_usuarios.registrar_usuario(correo, nombre, hash);

        //Genera el token y lo adjunta al correo
        let token = this.manejador_token.crear_token_registro(id);
        let link = `http://localhost:4200/cuenta?token=${token}`
        console.log(token, link);
        let cuerpo_correo: string = fs.readFileSync('assets/html/correo_activar.html',
            { encoding: 'utf8', flag: 'r' });
        cuerpo_correo = util.format(cuerpo_correo, link, link, link);
        return this.envio_correos.enviar_correo(correo, 'Confirmar cuenta — Audiophistic', cuerpo_correo);
    }

    //crear usuario Creador de Contenido
    async crear_usuario(correo: string, nombre: string, caracteristicas: Tipos_Usuario): Promise<string>{
        //genera una constrasenia, hash y registra al usuario en una BD
        let contrasena: string= this.generacion_contrasena();
        let hash: string = bcrypt.hashSync(contrasena, this.salts);
        
        let id = await this.gestor_usuarios.crear_usuario(correo, nombre, hash, caracteristicas);

        //Envia el correo con la contrasena
        let cuerpo_correo: string = fs.readFileSync('assets/html/correo_recuperar.html',
            { encoding: 'utf8', flag: 'r' });
        cuerpo_correo = util.format(cuerpo_correo, contrasena);
        return this.envio_correos.enviar_correo(correo, 'Confirmar cuenta de Usuario  — Audiophistic', cuerpo_correo);
        return "string";
    }

    private descifrar_token(token: string): Usuario{
        return this.manejador_token.descifrar_token(token)
    }

    //Genera la confirmacion del correo
    confirmar_usuario(token: string): Promise<string> {
        let id_usuario = this.manejador_token.verificar_token_registro(token);
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

    // Consulta los datos del producto respectivo
    eliminar_producto(id_producto: number): Promise<string> {
        return this.gestor_productos.eliminar_producto(id_producto);
    }

    // Consulta los estilos de un producto dado
    consultar_estilos(id_producto: number): Promise<Estilo[]>{
        return this.gestor_estilos.consultar_estilos(id_producto);
    }

    // Consulta todos los usuarios
    consultar_usuarios(): Promise<Usuario[]> {
        return this.gestor_usuarios.consultar_usuarios();
    }

    // Consulta los datos del usuario
    consultar_usuario(id_usuario: number): Promise<Usuario> {
        return this.gestor_usuarios.consultar_usuario(id_usuario);
    }

    //Consulta los productos de un Creador de Contenido segun su ID
    consultar_productos_creador(id_creador_contenido:number): Promise<Producto[]>{
        return this.gestor_productos.consultar_productos_creador(id_creador_contenido);
    }

    //Elimina de forma logica el usuario dado
    eliminar_usuario(id_usuario: number): Promise<string>{
        return this.gestor_usuarios.eliminar_usuario(id_usuario);
    }

    // Cambia la contrasena del usuario con los datos dados
    async cambiar_contrasena(token: string, contrasena: string): Promise<{ resultado: string }> {
        let descifrado: Usuario = this.descifrar_token(token);
        let hash: string = bcrypt.hashSync(contrasena, this.salts);
        return this.gestor_usuarios.cambiar_contrasena(descifrado.id_usuario, hash);
    }

    // Crea una nueva contrasena, la guarda y envia un correo con la contrasena
    async crear_contrasena_temporal(correo: string): Promise<string> {
        var contrasena_temporal: string = this.generacion_contrasena();
        // Guarda la contrasena temporal en la base
        let hash: string = bcrypt.hashSync(contrasena_temporal, this.salts);
        await this.gestor_usuarios.cambiar_contrasena_con_correo(correo, hash);
        // Integra la nueva contrasena al correo y lo envia
        var cuerpo_correo: string = fs.readFileSync('./assets/html/correo_recuperar.html',
            { encoding: 'utf8', flag: 'r' });
        cuerpo_correo = util.format(cuerpo_correo, contrasena_temporal);
        return this.envio_correos.enviar_correo(correo, "Contraseña Temporal — Audiophistic", cuerpo_correo);

    }

    // Funcion para generar un string aleatorio para la recuperacion de contrasenias
    private generacion_contrasena(): string {
        return generator.generate({
            length: 10,
            symbols: true,
            numbers: true,
            strict: true
        })

    }
}