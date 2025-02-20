import { Component } from '@angular/core';
import { DATOS_INMUEBLES } from '../../assets/datos-inmuebles';
import { CasasService } from '../services/casas.service';  // Asegúrate de importar los servicios correctos
import { PisosService } from '../services/pisos.service'; // Asegúrate de importar los servicios correctos
import { LocalesComercialesService } from '../services/locales-comerciales.service'; // Asegúrate de importar los servicios correctos
import { OficinasService } from '../services/oficinas.service'; // Asegúrate d

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent {
  tipo_preferencia="Comprar";
  tipo = 'piso'; // El tipo de propiedad seleccionado (puede ser 'casa', 'piso', etc.)
  provincia = 1; // ID de la provincia seleccionada (puedes obtenerlo de un selector)
  localidad = 1; // ID de la localidad seleccionada (puedes obtenerlo de un selector)
  propiedades: any[] = []; // Lista de propiedades filtradas
  error: string = ''; // Para manejar errores
  constructor(
    private casasService: CasasService,
    private pisosService: PisosService,
    private localesService: LocalesComercialesService,
    private oficinasService: OficinasService
  ) {}

  ngOnInit(): void {
    this.cargarPropiedades();
  }

  // Método para cargar las propiedades según los filtros seleccionados
  cargarPropiedades(): void {
    if (this.tipo === 'casa') {
      this.cargarCasas();
    } else if (this.tipo === 'piso') {
      this.cargarPisos();
    } else if (this.tipo === 'local') {
      this.cargarLocales();
      } else if (this.tipo === 'oficina') {
      this.cargarOficinas();
    }
  }

  // Método para cargar las casas filtradas
  cargarCasas(): void {
    this.casasService.obtenerCasas(this.tipo_preferencia, this.provincia, this.localidad)
      .subscribe(
        (data) => {
          this.propiedades = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener las casas.';
          console.error(error);
        }
      );
  }

  // Método para cargar los pisos filtrados
  cargarPisos(): void {
    this.pisosService.obtenerPisos(this.tipo_preferencia, this.provincia, this.localidad)
      .subscribe(
        (data) => {
          this.propiedades = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener los pisos.';
          console.error(error);
        }
      );
  }

  cargarLocales(): void {
    this.localesService.obtenerLocales(this.tipo_preferencia, this.provincia, this.localidad)
      .subscribe(
        (data) => {
          this.propiedades = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener los pisos.';
          console.error(error);
        }
      );
  }

  cargarOficinas(): void {
    this.oficinasService.obtenerOficinas(this.tipo_preferencia, this.provincia, this.localidad)
      .subscribe(
        (data) => {
          this.propiedades = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener los pisos.';
          console.error(error);
        }
      );
  }

}
