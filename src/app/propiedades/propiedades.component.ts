import { Component } from '@angular/core';
import { DATOS_INMUEBLES } from '../../assets/datos-inmuebles';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent {
  inmuebles = DATOS_INMUEBLES;
}
