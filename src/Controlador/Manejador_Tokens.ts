import jwt, { JwtPayload } from 'jsonwebtoken';
import { Usuario } from "../Modelo/Usuario"
require('dotenv').config();

/* Clase basada en el modelo de Singleton, 
   se encarga del manejo de los tokens */
export default class Manejador_Tokens {

    private static instancia: Manejador_Tokens;
    private static secreto: string = process.env.TOKEN_SECRET as string;

    private constructor() {
    }

    static get_instancia(): Manejador_Tokens {
        if (!Manejador_Tokens.instancia) {
            Manejador_Tokens.instancia = new Manejador_Tokens();
        }
        return Manejador_Tokens.instancia;
    }


    /* Crea el token del usuario para mantener la sesion
       y seguridad del usuario */
    crear_token(id_usuario: number, correo: string, id_tipo: number): {token: string} {
        var token: string = jwt.sign(
            {id_usuario, correo, tipo: {id_tipo}}
        , Manejador_Tokens.secreto, { expiresIn: '365 days' });
        return { token };
    }

    //Verifica que el token sea valido y regresa el id del tipo
    verificar_permisos(token: string, permiso: number): number{
        try{
        let usuario = jwt.verify(token, Manejador_Tokens.secreto) as JwtPayload
        console.log(usuario);
        return usuario.tipo.id_tipo;
        } catch(err){
            /* Si el token recibido no tiene una firma valida, no puede ser descifrado
               Debe retornar un permiso inexistente */
            return -1;
        } 
    }
}