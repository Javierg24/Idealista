import { Component, Input } from '@angular/core';
import { ImagenesService } from '../services/imagenes.service';

@Component({
  selector: 'app-card-inmueble',
  templateUrl: './card-inmueble.component.html',
  styleUrls: ['./card-inmueble.component.scss']
})
export class CardInmuebleComponent {
  @Input() datos: any;
  rutaImagen: string = 'http://localhost/idealista/IMAGES/noFoto.jpg';

  constructor(private imageService: ImagenesService){}

  ngOnInit(): void {
    this.getImagen(this.datos.id_propiedad);
  }

  getImagen(idPropiedad: number) {
    this.imageService.obtenerImagenesDePropiedad(idPropiedad).subscribe(
      (data: any) => {
        this.rutaImagen = data[0].url_imagen;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
