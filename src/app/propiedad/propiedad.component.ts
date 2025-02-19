import { Component } from '@angular/core';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss']
})
export class PropiedadComponent {
  inmueble = {
    id: 2,
    imagen: '../../assets/img/casa.jpg',
    titulo: 'Piso en calle Julio César',
    precio: 1200000,
    habitaciones: 5,
    metros: 283,
    ubicacion: 'Arenal - Museo - Tetuán, Sevilla',
    garaje: true,
    planta: 5,
    ascensor: true,
    descripcion: "GRAN PISO CON DOS TERRAZAS. Este gran piso te ofrece un amplio salón comedor que se abre a una luminosa terraza con..."
  };
}
