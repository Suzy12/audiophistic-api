"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var response = require("express").response;
var Client = require("pg").Client;
var connection = {
    user: "ztwdxcyhwxpcri",
    password: "ca6f2451de01cdf0b409c9ff73f10046404510f62d57ca2072db38baa36c6437",
    database: "d9e1u6rve32n8p",
    host: "ec2-3-237-55-96.compute-1.amazonaws.com",
    port: 5432,
    ssl: true
};
var DAO = /** @class */ (function () {
    function DAO() {
        this.client = new Client(connection);
        try {
            this.client.connect();
        }
        catch (err) {
            console.log(err);
        }
    }
    DAO.prototype.probar_exito = function (x, y) {
        var _this = this;
        this.client.query("select probar_exito($1, $2)", [x, y])
            .then(function (res) {
            console.table(res.rows);
            _this.client.end();
            return res.rows;
        })
            .catch(function (err) {
            console.log(err);
            _this.client.end();
        });
    };
    DAO.prototype.probar_error = function () {
        this.client.query("select probar_error()");
    };
    return DAO;
}());
exports.default = DAO;
