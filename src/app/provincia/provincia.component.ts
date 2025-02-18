import { Component } from '@angular/core';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent {
  provincia= "Sevilla";
  tipoPropiedad= "vivienda";
  localidades = [
    { nombre: 'Estepa' },
    { nombre: 'Utrera' },
    { nombre: 'Dos Hermanas' },
    { nombre: 'Camas' },
    { nombre: 'Coria del Rio' },
    { nombre: 'El Viso del Alcor' },
    { nombre: 'El Sauce' },
    { nombre: 'El Bosque' },
    { nombre: 'La Loma' },
    { nombre: 'La Puebla del Río' },
    { nombre: 'La Sagrada Familia' },
    { nombre: 'La Rinconada' },
    { nombre: 'Écija' },
  ];
}
