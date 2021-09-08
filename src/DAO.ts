process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const { response } = require("express");
const {Client} = require("pg");

const connection = {
    user: "ztwdxcyhwxpcri",
    password: "ca6f2451de01cdf0b409c9ff73f10046404510f62d57ca2072db38baa36c6437",
    database: "d9e1u6rve32n8p",
    host: "ec2-3-237-55-96.compute-1.amazonaws.com",
    port: 5432,
    ssl: true
};

export default class DAO{
    constructor(){
        this.client = new Client(connection);
        try{
            this.client.connect();
        }catch(err){
            console.log(err)
        }
    }

    probar_exito(x,y){
        this.client.query(`select probar_exito($1, $2)`, [x,y])
        .then(res => {
            console.table(res.rows)
            this.client.end()
            return res.rows;
        })
        .catch(err => {
            console.log(err)
            this.client.end()
        })

    }

    probar_error(){
        this.client.query(`select probar_error()`)


    }


}



