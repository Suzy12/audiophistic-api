//import { text } from "stream/consumers";
import nodemailer from 'nodemailer';

require('dotenv').config();

//Clase basada en el modelo de Singleton, se encarga del envio de mails
export default class Envio_Mails{

    private static instancia: Envio_Mails;

    private constructor(){ }

    static get_instancia() {
        if (!Envio_Mails.instancia) {
            Envio_Mails.instancia = new Envio_Mails();
        }
        return Envio_Mails.instancia;
    }

    static manda_correo(destinatario:string){ //la funcion con la que vamos a mandar correos
        let transporter = nodemailer.createTransport({

            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        //lo que dice el correo
        let  mailOptions = {
            from: 'Equipo de Audiophistic <' + process.env.EMAIL_USER + '>',
            to:    destinatario,
            subject: 'Confirmacion',
            text: "este es un correo de confirmacion"
        };
        
        //para mandar el mail. DEBE tener la funcion anonima con (err, info)
        transporter.sendMail(mailOptions, (err,info ) => {
            if (err){
                throw err;
            }
            console.log(info);
        });
    

    }

}
