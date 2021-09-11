import jwt, { JwtPayload } from 'jsonwebtoken';
import { Usuario } from "../Modelo/Usuario"
//import { Controlador } from "./Controlador"
require('dotenv').config();

export default class Gestor_Usuariios {

    crear_usuario(id_usuario:number, nombre: string, email:string): string {

        return "usuario creado";

    }

    eliminar_usuario(id_usuairo: number): string{

        return "usuario eliminado";

    }

    
    /*consultar_usuario(id_usuairo: number): any{
        //let objeto = 
        return Controlador.get_usuario(2);

    }*/

    editar_usuario(id_usuairo: number): string{

        return "usuario modificado";
    }



}