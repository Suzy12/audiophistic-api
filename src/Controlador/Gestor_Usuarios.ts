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


    //creación de usuario
    crear_usuario( config: Usuario, id_usuario: number, nombre: string, email: string, id_tipo: string): string {
  
        let nuevo_usuario = {id_usuario, nombre, email, id_tipo};
        if (config.id_usuario){
            nuevo_usuario.id_usuario = config.id_usuario
        }
        if (config.email){

        }


        return "usuario creado";

    }

    //eliminacion de usuario
    eliminar_usuario(id_usuairo: number): string {

        return "usuario eliminado";

    }

    // Crea el hash y llama a cambiar la contraseña a la base
    async cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{ resultado: string }> {
        let hash: string = await bcrypt.hash(contrasena, Gestor_Usuarios.salts)
        let resultado: string = await this.base_datos.cambiar_contrasena(id_usuario, hash)
        return { resultado };
    }
    
    //consulta un usuario con su id
    consultar_usuario(id_usuario: number): Promise<Usuario>{
        return this.base_datos.obtener_usuario(id_usuario).then((usuario:any)=>{
            return usuario
        })
        .catch((err:any) => {
            throw err
        })

    }


    //edita a un usuario
    editar_usuario(id_usuairo: number): string {

        return "usuario modificado";
    }



}