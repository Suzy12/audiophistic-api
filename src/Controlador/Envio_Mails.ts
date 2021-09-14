//import { text } from "stream/consumers";
import nodemailer, { SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

require('dotenv').config();

//Clase basada en el modelo de Singleton, se encarga del envio de correos
export default class Envio_Mails {
    transporter: Mail<SentMessageInfo>

    private static instancia: Envio_Mails;

    private constructor() {
        //Genera el servicio de mensajeria
        this.transporter = nodemailer.createTransport({
            pool: true,
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    static get_instancia() {
        if (!Envio_Mails.instancia) {
            Envio_Mails.instancia = new Envio_Mails();
        }
        return Envio_Mails.instancia;
    }

    //Envia el correo segun los datos que reciva
    manda_correo(destinatario: string, asunto: string, cuerpo: string) { //la funcion con la que vamos a mandar correos

        //Se crea un objeto con los datos del objeto
        let mailOptions = {
            from: 'Equipo de Audiophistic <' + process.env.EMAIL_USER + '>',
            to: destinatario,
            subject: asunto,
            html: cuerpo
        };

        // Y se envia el correo
        this.transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw err;
            }
            console.log(info);
        });


    }

}
