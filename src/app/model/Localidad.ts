export class Localidad {
    id_localidad: number;
    id_provincia: number;
    nombre: string;

    constructor(id_localidad: number, id_provincia: number, nombre: string){
        this.id_localidad = id_localidad;
        this.id_provincia = id_provincia;
        this.nombre = nombre;
    }

}