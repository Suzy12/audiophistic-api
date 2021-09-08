import { Client } from "pg";

require('dotenv').config();

const connection = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: { rejectUnauthorized: false }
};

export default class DAO {
    cliente: Client

    private static instancia: DAO;

    private constructor() {
        this.cliente = new Client(connection);
        try {
            this.cliente.connect();
        } catch (err) {
            console.log(err)
        }
    }

    static get_instancia() {
        if (!DAO.instancia) {
            DAO.instancia = new DAO();
        }
        return DAO.instancia;
    }

    cambiar_contrasena(id_usuario: number, contrasena: String){
        return this.cliente.query('select cambiar_contrasena($1::int,$2::character varying(60))', [id_usuario, contrasena])
            .then(res => {
                if(res.rows[0].cambiar_contrasena){
                    return {resultado: res.rows[0].cambiar_contrasena};
                }else{
                    return {error: {message:"No se pudo cambiar la contraseña"}}
                }
            })
            .catch(err => {
                return {error:err};
            });
    }


}



