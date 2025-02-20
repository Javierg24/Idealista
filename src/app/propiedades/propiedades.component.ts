import { Component } from '@angular/core';
import { CasasService } from '../services/casas.service';  // Asegúrate de importar los servicios correctos
import { PisosService } from '../services/pisos.service'; // Asegúrate de importar los servicios correctos
import { LocalesComercialesService } from '../services/locales-comerciales.service'; // Asegúrate de importar los servicios correctos
import { OficinasService } from '../services/oficinas.service'; // Asegúrate d
import { PropiedadFiltro } from '../model/PropiedadFiltro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent {
  tipo_preferencia="Comprar";
  tipo_propiedad = ''; // El tipo de propiedad seleccionado (puede ser 'casa', 'piso', etc.)
  provincia = 1; // ID de la provincia seleccionada (puedes obtenerlo de un selector)
  localidad = 1; // ID de la localidad seleccionada (puedes obtenerlo de un selector)
  propiedades: any[] = []; // Lista de propiedades filtradas
  error: string = ''; // Para manejar errores
  filtros: PropiedadFiltro | null = null;

  constructor(
    private route: Router,
    private casasService: CasasService,
    private pisosService: PisosService,
    private localesService: LocalesComercialesService,
    private oficinasService: OficinasService
  ) {}

  ngOnInit(): void {
    const filtrosJSON = localStorage.getItem('selectedOptions');
    if(filtrosJSON){
      this.filtros = JSON.parse(filtrosJSON);
      if(this.filtros){
        this.tipo_propiedad = this.filtros.tipo_propiedad.toLowerCase();
        this.tipo_preferencia = this.filtros.tipo_preferencia;
        this.provincia = this.filtros.provincia.id_provincia;
        if(this.filtros.localidad){
          this.localidad = this.filtros.localidad.id_localidad;
        }
      }
    }
    this.cargarPropiedades();
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

  navigateToPropiedad(id: number): void{
    localStorage.setItem('selectedProperty',JSON.stringify({id, tipo_propiedad: this.tipo_propiedad}));
    this.route.navigate(['/propiedad']);
  }

}
