import fs from 'fs';
import util from 'util'
import generator from 'generate-password'
import Gestor_Usuarios from "./Gestor_Usuarios";
import Gestor_Prodcuctos from "./Gestor_Productos";
import Enviador_Correos from "./Enviador_Correos";
import bcrypt from 'bcrypt';
import { Producto } from "../Modelo/Producto";
import { Usuario } from "../Modelo/Usuario";
import { Categoria } from '../Modelo/Categoria';
import Manejador_Tokens from './Manejador_Tokens';
import Gestor_Estilos from './Gestor_Estilos';
import Gestor_Categorias from './Gestor_Categorias';
import { Estilo } from '../Modelo/Estilo';
import { Tipos_Usuario } from '../Modelo/Tipos_Usuario';
import { Carrito } from '../Modelo/Carrito';
import Gestor_Carrito from './Gestor_Carrito';
import { Pedido } from '../Modelo/Pedido';
import Gestor_Pedidos from './Gestor_Pedidos';
import { Direccion } from "../Modelo/Direccion";

/* Se encarga de coordinar las funcionalidades 
   De la pagina web con sus clases respectivas*/
export default class Controlador {
    private envio_correos: Enviador_Correos;
    private manejador_token: Manejador_Tokens;
    private gestor_productos: Gestor_Prodcuctos;
    private gestor_usuarios: Gestor_Usuarios;
    private gestor_estilos: Gestor_Estilos;
    private gestor_categorias: Gestor_Categorias;
    private gestor_carrito: Gestor_Carrito;
    private gestor_pedidos: Gestor_Pedidos;
    //El numero de salts para el hash
    private salts = 10;

    constructor() {
        this.envio_correos = Enviador_Correos.get_instancia();
        this.manejador_token = Manejador_Tokens.get_instancia();
        this.gestor_productos = new Gestor_Prodcuctos();
        this.gestor_usuarios = new Gestor_Usuarios();
        this.gestor_estilos = new Gestor_Estilos();
        this.gestor_categorias = new Gestor_Categorias();
        this.gestor_carrito = new Gestor_Carrito();
        this.gestor_pedidos= new Gestor_Pedidos();
    }

    // Registra a un consumidor
    async registrar_usuario(correo: string, nombre: string, contrasena: string): Promise<string> {
        //Genera el hash y guarda al usuario en la base de datos
        correo = correo.toLowerCase();
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
    async crear_usuario(correo: string, nombre: string, caracteristicas: Tipos_Usuario): Promise<string> {
        //genera una constrasenia, hash y registra al usuario en una BD
        correo = correo.toLowerCase();
        let contrasena: string = this.generacion_contrasena();
        let hash: string = bcrypt.hashSync(contrasena, this.salts);

        await this.gestor_usuarios.crear_usuario(correo, nombre, hash, caracteristicas);

        //Envia el correo con la contrasena
        let cuerpo_correo: string = fs.readFileSync('assets/html/correo_cuenta_nueva.html',
            { encoding: 'utf8', flag: 'r' });
        cuerpo_correo = util.format(cuerpo_correo, contrasena);
        return this.envio_correos.enviar_correo(correo, 'Confirmar cuenta de Usuario  — Audiophistic', cuerpo_correo);
    }

    //Genera la confirmacion del correo
    confirmar_usuario(token: string): Promise<string> {
        let id_usuario = this.manejador_token.verificar_token_registro(token);
        return this.gestor_usuarios.confirmar_usuario(id_usuario);
    }

    // Cambia la contrasena del usuario con los datos dados
    async cambiar_contrasena(token: string, contrasena: string): Promise<string> {
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

    // Editar la informacion de un usuario
    editar_usuario(token: string, nombre: string, caracteristicas: Tipos_Usuario): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        return this.gestor_usuarios.editar_usuario(descifrado, nombre, caracteristicas);
    }
    
    // Consulta todos los usuarios
    consultar_usuarios(): Promise<Usuario[]> {
        return this.gestor_usuarios.consultar_usuarios();
    }

    // Consulta los datos del usuario
    consultar_usuario(id_usuario: number): Promise<Usuario> {
        return this.gestor_usuarios.consultar_usuario(id_usuario);
    }

    // Consulta los datos del usuario
    consultar_creador_contenido(id_creador: number): Promise<Usuario> {
        return this.gestor_usuarios.consultar_creador_contenido(id_creador);
    }

    // Consulta los datos del usuario para ese usuario
    consultar_perfil(token: string): Promise<Usuario> {
        let descifrado: Usuario = this.descifrar_token(token);
        return this.gestor_usuarios.consultar_usuario(descifrado.id_usuario);
    }

    // Elimina de forma logica el usuario dado
    eliminar_usuario(id_usuario: number): Promise<string> {
        return this.gestor_usuarios.eliminar_usuario(id_usuario);
    }

    // Crea el producto con los datos enviados
    crear_producto(producto: Producto, estilos: Estilo[], token: string): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        producto.id_creador = descifrado.id_usuario;
        return this.gestor_productos.crear_producto(producto, estilos);
    }

    // "Modifica" el producto con los datos enviados
    modificar_producto(producto: Producto, estilos: Estilo[], token: string): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        producto.id_creador = descifrado.id_usuario;
        return this.gestor_productos.modificar_producto(producto, estilos);
    }

    // Consulta todos los productos
    consultar_productos(): Promise<Producto[]> {
        return this.gestor_productos.consultar_productos();
    }

    //Consulta los productos de un Creador de Contenido segun su ID
    consultar_productos_creador(id_creador_contenido: number): Promise<Producto[]> {
        return this.gestor_productos.consultar_productos_creador(id_creador_contenido);
    }

    //Consulta los productos, mas su foto, de un Creador de Contenido segun su ID
    thumbnail_productos_creador(id_creador_contenido: number): Promise<Producto[]> {
        return this.gestor_productos.thumbnail_productos_creador(id_creador_contenido);
    }

    //Consulta los productos de un Usuario segun su ID
    consultar_productos_usuario(token: string): Promise<Producto[]> {
        let descifrado: Usuario = this.descifrar_token(token);
        return this.gestor_productos.consultar_productos_creador(descifrado.id_usuario);
    }

    // Consulta los datos del producto respectivo
    productos_por_tipo(id_tipo: number): Promise<Producto[]> {
        return this.gestor_productos.productos_por_tipo(id_tipo);
    }

    // Consulta los datos del producto respectivo
    consultar_producto(id_producto: number): Promise<Producto> {
        return this.gestor_productos.consultar_producto(id_producto);
    }

    // Consulta los datos del producto respectivo
    eliminar_producto(id_producto: number): Promise<string> {
        return this.gestor_productos.eliminar_producto(id_producto);
    }

    // Consulta los datos del producto respectivo
    eliminar_mi_producto(id_producto: number, token: string): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        return this.gestor_productos.eliminar_mi_producto(id_producto, descifrado.id_usuario);
    }

    // Consulta los estilos de un producto dado
    consultar_estilos(id_producto: number): Promise<Estilo[]> {
        return this.gestor_estilos.consultar_estilos(id_producto);
    }

    // "Modifica" la existencia de los estilos del producto
    modificar_existencia(token: string, estilos: Estilo[]): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        return this.gestor_estilos.modificar_existencia(descifrado.id_usuario, estilos);
    }

    // Agrega un producto al carrito
    agregar_al_carrito(token: string, id_producto: number, id_estilo: number, cantidad: number): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        if(descifrado.caracteristicas?.id_tipo != 3){
            throw new Error('El usuario no puede tener un carrito');
        };
        return this.gestor_carrito.agregar_al_carrito(descifrado.id_usuario, id_producto, id_estilo, cantidad);
    }

    // Cambia la cantiadd de un producto del carrito
    cambiar_cantidad_carrito(token: string, id_producto: number, id_estilo: number, cantidad: number): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        if(descifrado.caracteristicas?.id_tipo != 3){
            throw new Error('El usuario no puede tener un carrito');
        };
        return this.gestor_carrito.cambiar_cantidad_carrito(descifrado.id_usuario, id_producto, id_estilo, cantidad);
    }

    // Elimina un producto del carrito
    eliminar_del_carrito(token: string, id_producto: number, id_estilo: number): Promise<string> {
        let descifrado: Usuario = this.descifrar_token(token);
        if(descifrado.caracteristicas?.id_tipo != 3){
            throw new Error('El usuario no puede tener un carrito');
        };
        return this.gestor_carrito.eliminar_del_carrito(descifrado.id_usuario, id_producto, id_estilo);
    }

    // Thumbnail del carrito de un usuario segun su ID
    thumbnail_carrito(token: string): Promise<{ cambiado: boolean, carrito: Carrito[] }>{
        let descifrado: Usuario = this.descifrar_token(token);
        if(descifrado.caracteristicas?.id_tipo != 3){
            throw new Error('El usuario no puede tener un carrito');
        };
        return this.gestor_carrito.thumbnail_carrito(descifrado.id_usuario);
    }

    // Consulta el carrito de un usuario segun su ID
    consultar_carrito(token: string): Promise<{ cambiado: boolean, carrito: Carrito[] }>{
        let descifrado: Usuario = this.descifrar_token(token);
        if(descifrado.caracteristicas?.id_tipo != 3){
            throw new Error('El usuario no puede tener un carrito');
        };
        return this.gestor_carrito.consultar_carrito(descifrado.id_usuario);
    }

    // Realiza el checkout
    realizar_checkout(token: string, carrito: Carrito[], monto_total: number, nombre: string,
        correo: string, direccion_pedido: Direccion): Promise<number>{
        let descifrado: Usuario = this.descifrar_token(token);
        return this.gestor_pedidos.realizar_checkout(descifrado.id_usuario, carrito, monto_total, nombre, correo, direccion_pedido,);
    }

    // Realiza el pago
    realizar_pago(id_pedido: number, direccion_pedido: Direccion): Promise<string>{
        return this.gestor_pedidos.realizar_pago(id_pedido, direccion_pedido);
    }

    // Crea categoria con los datos 
    crear_categoria(nombre: string): Promise<string> {
        return this.gestor_categorias.crear_categoria(nombre);
    }

    // Consulta todas las categorias
    consultar_categorias(): Promise<Categoria[]> {
        return this.gestor_categorias.consultar_categorias();
    }

    // Elimina una categoria
    eliminar_categoria(id_categoria: number): Promise<string> {
        return this.gestor_categorias.eliminar_categoria(id_categoria);
    }

    // Pide al manejador de tokens que descifre el token
    private descifrar_token(token: string): Usuario {
        return this.manejador_token.descifrar_token(token)
    }

    // Funcion para generar un string aleatorio para la recuperacion de contrasenias
    private generacion_contrasena(): string {
        return generator.generate({
            length: 10,
            numbers: true,
        })

    }
}