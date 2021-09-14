import { Usuario } from "../Modelo/Usuario"
import DAO from "./DAO";
const bcrypt = require('bcrypt');
export default class Gestor_Usuarios {
    // Definimos como hacer las llamadas al DAO
    base_datos: DAO;
    // El numero de salts para el cifrado de la contrasena
    private static salts = 10

    constructor() {
        this.base_datos = DAO.get_instancia();
    }


    // Registra el usuario con los datos ingresados
    registrar_usuario(id_usuario: number, nombre: string, email: string, id_tipo: string): string {
        let nuevo_usuario = { id_usuario, nombre, email, id_tipo };
        return "usuario creado";
    }

    // Elimina el usuario dados
    eliminar_usuario(id_usuairo: number): string {
        return "usuario eliminado";
    }

    // Crea el hash y llama a cambiar la contraseña a la base
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{ resultado: string }> {
        let hash: string = await bcrypt.hash(contrasena, Gestor_Usuarios.salts)
        let resultado: string = await this.base_datos.cambiar_contrasena(id_usuario, hash)
        return { resultado };
    }

    // Crea el hash y llama a cambiar la contraseña a la base
    async cambiar_contrasena_con_mail(correo: string, contrasena: string): Promise<{ resultado: string }> {
        let hash: string = await bcrypt.hash(contrasena, Gestor_Usuarios.salts)
        let resultado: string = await this.base_datos.cambiar_contrasena_con_mail(correo, hash)
        console.log(hash);
        return { resultado };
    }

    // Consulta un usuario con su id
    consultar_usuario(id_usuario: number): Promise<Usuario> {
        return this.base_datos.consultar_usuario(id_usuario)
            .then((usuario: Usuario) => {
                return usuario;
            })
    }


    //Trae la informacion del grupo de usuarios
    consultar_usuarios(): Promise<Usuario[]> {
        return this.base_datos.consultar_usuarios()
            .then((usuario: Usuario[]) => {
                return usuario;
            })
    }


    //edita a un usuario
    editar_usuario(id_usuairo: number): string {

        return "usuario modificado";
    }



}