import { Usuario } from "../Modelo/Usuario"
import DAO from "./DAO";
import bcrypt from 'bcrypt';
export default class Gestor_Usuarios {
    // Definimos como hacer las llamadas al DAO
    base_datos: DAO;
    // El numero de salts para el cifrado de la contrasena
    private static salts = 10

    constructor() {
        this.base_datos = DAO.get_instancia();
    }


    // Registra el usuario con los datos ingresados
    registrar_usuario(nombre: string, correo: string, contrasena: string): Promise<number> {
        let hash: string = bcrypt.hashSync(contrasena, Gestor_Usuarios.salts);
        return this.base_datos.registrar_usuario(nombre, correo, hash)
            .then((id_tipo: number) => {
                return id_tipo;
            });
    }

    confirmar_usuario(id_usuario: number): Promise<string>{
        return this.base_datos.confirmar_usuario(id_usuario);
    }

    verificar_usuario(correo: string): Promise<Usuario>{
        return this.base_datos.verificar_usuario(correo);
    }

    // Elimina el usuario dados
    eliminar_usuario(id_usuairo: number): string {
        return "usuario eliminado";
    }

    // Crea el hash y llama a cambiar la contraseña a la base
    cambiar_contrasena(id_usuario: number, contrasena: string): Promise<{ resultado: string }> {
        let hash: string = bcrypt.hashSync(contrasena, Gestor_Usuarios.salts);
        return this.base_datos.cambiar_contrasena(id_usuario, hash)
            .then((resultado: string) => {
                return { resultado };
            })
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


    // Modifica los datos del usuario enviado
    editar_usuario(id_usuairo: number): string {

        return "usuario modificado";
    }



}