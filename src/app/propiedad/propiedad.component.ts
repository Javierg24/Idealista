import { Component, Input } from '@angular/core';
import { CasasService } from '../services/casas.service';  // Asegúrate de importar los servicios correctos
import { PisosService } from '../services/pisos.service'; // Asegúrate de importar los servicios correctos
import { LocalesComercialesService } from '../services/locales-comerciales.service'; // Asegúrate de importar los servicios correctos
import { OficinasService } from '../services/oficinas.service'; // Asegúrate d
import { Router } from '@angular/router';
import { ImagenesService } from '../services/imagenes.service';

@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss']
})
export class PropiedadComponent {
  filtros: any;
  tipo_propiedad: string = '';
  inmueble: any;
  id: number = 0;
  error: string = '';
  rutaImagen: string = 'http://localhost/idealista/IMAGES/noFoto.jpg';

  constructor(
    private route: Router,
    private casasService: CasasService,
    private pisosService: PisosService,
    private localesService: LocalesComercialesService,
    private oficinasService: OficinasService,
    private imagesService: ImagenesService
  ) { }

  ngOnInit(): void {
    const filtrosJSON = localStorage.getItem('selectedProperty');
    if(filtrosJSON){
      this.filtros = JSON.parse(filtrosJSON);
      if(this.filtros){
        this.id = this.filtros.id;
        this.tipo_propiedad = this.filtros.tipo_propiedad;
      }
    }
    this.cargarPropiedades();
    this.getImagen(this.id);
  }

  getImagen(idPropiedad: number) {
    this.imagesService.obtenerImagenesDePropiedad(idPropiedad).subscribe(
      (data: any) => {
        console.log(data);
        this.rutaImagen = data[0].url_imagen;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Método para cargar las propiedades según los filtros seleccionados
  cargarPropiedades(): void {
    if (this.tipo_propiedad === 'casas') {
      this.cargarCasas();
    } else if (this.tipo_propiedad === 'pisos') {
      this.cargarPisos();
    } else if (this.tipo_propiedad === 'locales') {
      this.cargarLocales();
    } else if (this.tipo_propiedad === 'oficinas') {
      this.cargarOficinas();
    }
  }

  // Método para cargar las casas filtradas
  cargarCasas(): void {
    this.casasService.obtenerCasaPorId(this.id)
      .subscribe(
        (data) => {
          localStorage.setItem('data',JSON.stringify(data));
          this.inmueble = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener las casas.';
          console.error(error);
        }
      );
  }

  // Método para cargar los pisos filtrados
  cargarPisos(): void {
    this.pisosService.obtenerPisoPorId(this.id)
      .subscribe(
        (data) => {
          localStorage.setItem('data',JSON.stringify(data));
          this.inmueble = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener las casas.';
          console.error(error);
        }
      );
  }

  cargarLocales(): void {
    this.localesService.obtenerLocalPorId(this.id)
      .subscribe(
        (data) => {
          this.inmueble = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener las casas.';
          console.error(error);
        }
      );
  }

  cargarOficinas(): void {
    this.oficinasService.obtenerOficinaPorId(this.id)
      .subscribe(
        (data) => {
          this.inmueble = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener las casas.';
          console.error(error);
        }
      );
  }
}
