import { Localidad } from "./Localidad";
import { Provincia } from "./Provincia";

export class PropiedadFiltro{
    tipo_propiedad: string;
    tipo_preferencia: string;
    provincia: Provincia;
    localidad?: Localidad;

    constructor(tipo_propiedad: string, tipo_preferencia: string, prov: Provincia, localidad?: Localidad){
        this.tipo_propiedad = tipo_propiedad;
        this.tipo_preferencia = tipo_preferencia;
        this.provincia = prov;
        this.localidad = localidad;
    }

}