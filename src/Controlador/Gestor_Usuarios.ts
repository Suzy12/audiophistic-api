import { Usuario } from "../Modelo/Usuario"
import DAO from "./DAO";
const bcrypt = require('bcrypt');
export default class Gestor_Usuarios {
    base_datos: DAO;
    // El numero de salts para el cifrado de la contrasena
    private static salts = 10

    constructor(){
        this.base_datos = DAO.get_instancia();
    }

    crear_usuario(id_usuario: number, nombre: string, email: string): string {

        return "usuario creado";

    }

    eliminar_usuario(id_usuairo: number): string {

        return "usuario eliminado";

    }

    // Crea el hash y llama a cambiar la contraseña a la base
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{ resultado: string }> {
        let hash: string = await bcrypt.hash(contrasena, Gestor_Usuarios.salts)
        let resultado: string = await this.base_datos.cambiar_contrasena(id_usuario, hash)
        return { resultado };
    }
    /*consultar_usuario(id_usuairo: number): any{
        //let objeto = 
        return Controlador.get_usuario(2);

    }*/

    editar_usuario(id_usuairo: number): string {

        return "usuario modificado";
    }



}