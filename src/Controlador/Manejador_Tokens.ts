import jwt from 'jsonwebtoken';
require('dotenv').config();

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
            {id_usuario, correo, id_tipo}
        , Manejador_Tokens.secreto, { expiresIn: '1000h' });

        return { token };
    }


    descifrar_token(token: string): any{
        return jwt.verify(token, Manejador_Tokens.secreto);
    }
}