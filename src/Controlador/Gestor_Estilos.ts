import { Estilo } from "../Modelo/Estilo";
import DAO from "./DAO";
export default class Gestor_Estilos {

    private base_datos: DAO;

    constructor() {
        this.base_datos = DAO.get_instancia();
    }

    // Crea el producto con los datos enviados
    crear_estilos(producto: Estilo): string {

        return "producto creado";

    }

    // Obtiene los datos del producto
    consultar_estilos(id_producto: number): Promise<Estilo[]> {
        return this.base_datos.consultar_estilos(id_producto)
            .then((producto: Estilo[]) => {
                return producto;
            })
    }

    // Modifica los datos del producto enviado, cambia la versión y inserta los nuevos datos según la versión
    editar_estilo(id_producto: number): string {
        return "producto modificado";
    }



}