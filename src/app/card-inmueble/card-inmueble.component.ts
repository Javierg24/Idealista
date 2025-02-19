import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-inmueble',
  templateUrl: './card-inmueble.component.html',
  styleUrls: ['./card-inmueble.component.scss']
})
export class CardInmuebleComponent {
  @Input() datos: any;
}
