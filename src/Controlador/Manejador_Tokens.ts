import jwt, { JwtPayload } from 'jsonwebtoken';
import { Usuario } from "../Modelo/Usuario"
require('dotenv').config();

//Clase basada en el modelo de Singleton, se encarga del manejo de los tokens
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

    crear_token(id_usuario: number, correo: string, id_tipo: number): {token: string} {
        var token: string = jwt.sign(
            {id_usuario, correo, tipo: {id_tipo}}
        , Manejador_Tokens.secreto, { expiresIn: '365 days' });

        return { token };
    }


    descifrar_token(token: string): Usuario{
        let objeto = jwt.verify(token, Manejador_Tokens.secreto) as JwtPayload
        return {id_usuario: objeto.id_usuario, email: objeto.correo, tipo: objeto.tipo};
    }
}