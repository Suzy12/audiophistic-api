import { Producto } from "../Modelo/Producto";
import { Tipos_Usuario } from "../Modelo/Tipos_Usuario";
import { Usuario } from "../Modelo/Usuario"
import { Carrito } from "../Modelo/Carrito";
import DAO from "./DAO";

export default class Gestor_Carrito{
    base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }


    // Consulta el contenido del carrito
    consultar_carrito(id_usuario: number): Promise<Carrito[]>{
        return this.base_datos.consultar_carrito(id_usuario)
            .then((producto: Carrito[]) => {
                return producto;
            })
    }
}