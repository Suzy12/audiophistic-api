import jwt from 'jsonwebtoken';
require('dotenv').config();

const secreto: string = process.env.TOKEN_SECRET as string;

export default class Manejador_Tokens {

    private static instancia: Manejador_Tokens;

    private constructor() {
    }

    crear_token(id_usuario: number, correo: string, id_tipo: number) {

        /*var imprime: string= jwt.sign({
            data: id_usuario, correo, id_tipo
          }, secreto, { expiresIn: '1000h' });

        return {token: imprime};*/

        return {token:"mi token"};
    }





}