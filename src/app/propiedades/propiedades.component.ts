import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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

  private filtrosChanged = new Subject<void>();

  tipo_preferencia = "Comprar";
  tipo_propiedad = ''; // El tipo de propiedad seleccionado (puede ser 'casa', 'piso', etc.)
  provincia = 1; // ID de la provincia seleccionada (puedes obtenerlo de un selector)
  localidad = 1; // ID de la localidad seleccionada (puedes obtenerlo de un selector)
  propiedades: any[] = []; // Lista de propiedades filtradas
  error: string = ''; // Para manejar errores
  filtros: PropiedadFiltro | null = null;
  filtrosSeleccionados: any[] = [];

  // Filtros para el tipo de propiedad
  precioMin: number | null = null;  // Asegurándote de que solo pueda ser número o null, no undefined
  precioMax: number | null = null;
  tamanoMin: number | null = null;
  tamanoMax: number | null = null;
  habitaciones: number | null = null;
  banos: number | null = null;
  extras: any = {
    jardin: false,
    piscina: false
  };
  planta: number | null = null;
  n_salas: number | null = null;
  zona_comercial: boolean = false;
  tipoNegocio: string[] = [];
  tipoPropiedad: string[] = [];
  zona_transitada: boolean = false;




  filtrosDisponibles = {
    casas: [
      { nombre: 'Habitaciones', tipo: 'checkbox', opciones: [1, 2, 3, 4, '4 o más'] },
      { nombre: 'Baños', tipo: 'checkbox', opciones: [1, 2, 3, '3 o más'] },
      { nombre: 'Jardín', tipo: 'checkbox', opciones: ['Sí'] },
      { nombre: 'Piscina', tipo: 'checkbox', opciones: ['Sí'] },
      { nombre: 'Tamaño mínimo (m²)', tipo: 'number' },
      { nombre: 'Tamaño máximo (m²)', tipo: 'number' }
    ],
    pisos: [
      { nombre: 'Habitaciones', tipo: 'checkbox', opciones: [1, 2, 3, 4, '4 o más'] },
      { nombre: 'Baños', tipo: 'checkbox', opciones: [1, 2, 3, '3 o más'] },
      { nombre: 'Planta', tipo: 'checkbox', opciones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
      { nombre: 'Tamaño mínimo (m²)', tipo: 'number' },
      { nombre: 'Tamaño máximo (m²)', tipo: 'number' }
    ],
    oficinas: [
      { nombre: 'Tamaño mínimo (m²)', tipo: 'number' },
      { nombre: 'Tamaño máximo (m²)', tipo: 'number' },
      { nombre: 'Planta', tipo: 'number' },
      { nombre: 'Numero de salas', tipo: 'checkbox', opciones: [1, 2, 3, 4, 5, 6, 7, 8] },
      { nombre: 'zona comercial', tipo: 'checkbox', opciones: ['Sí', 'No'] }
    ],
    locales: [
      { nombre: 'Tamaño mínimo (m²)', tipo: 'number' },
      { nombre: 'Tamaño máximo (m²)', tipo: 'number' },
      { nombre: 'Tipo_Negocio', tipo: 'checkbox', opciones: ['Tienda', 'Restaurante'] }
    ]
  };


  constructor(
    private route: Router,
    private casasService: CasasService,
    private pisosService: PisosService,
    private localesService: LocalesComercialesService,
    private oficinasService: OficinasService
  ) {

    this.filtrosChanged.pipe(
      debounceTime(300), // Esperar 300ms después del último cambio
      distinctUntilChanged() // Evitar llamadas duplicadas
    ).subscribe(() => {
      this.cargarPropiedades();
    });

  }

  ngOnInit(): void {
    const filtrosJSON = localStorage.getItem('selectedOptions');
    if (filtrosJSON) {
      this.filtros = JSON.parse(filtrosJSON);
      if (this.filtros) {
        this.tipo_propiedad = this.filtros.tipo_propiedad.toLowerCase();
        this.tipo_preferencia = this.filtros.tipo_preferencia;
        this.provincia = this.filtros.provincia.id_provincia;
        if (this.filtros.localidad) {
          this.localidad = this.filtros.localidad.id_localidad;
        }
      }
    }
    this.cargarFiltros();
    this.cargarPropiedades();
  }

  actualizarFiltros(): void {
    // Llamar a cargarPropiedades para ejecutar la consulta con los nuevos filtros
    this.filtrosChanged.next();
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

  cargarFiltros(): void {
    switch (this.tipo_propiedad) {
      case 'casas':
        this.filtrosSeleccionados = this.filtrosDisponibles.casas;
        break;
      case 'pisos':
        this.filtrosSeleccionados = this.filtrosDisponibles.pisos;
        break;
      case 'locales':
        this.filtrosSeleccionados = this.filtrosDisponibles.locales;
        break;
      case 'oficinas':
        this.filtrosSeleccionados = this.filtrosDisponibles.oficinas;
        break;
      default:
        this.filtrosSeleccionados = [];
        break;
    }
  }


  cargarCasas2(): void {
    // Crear un objeto con los parámetros que tienen valores definidos
    const params: any = {
      tipo: this.tipo_preferencia,
      provincia: this.provincia,
      localidad: this.localidad,
    };

    // Añadir parámetros solo si tienen valores definidos
    if (this.precioMin !== undefined && this.precioMin !== null) {
      params.precioMin = this.precioMin;
    }
    if (this.precioMax !== undefined && this.precioMax !== null) {
      params.precioMax = this.precioMax;
    }
    if (this.habitaciones !== undefined && this.habitaciones !== null) {
      params.n_habitaciones = this.habitaciones;
    }
    if (this.banos !== undefined && this.banos !== null) {
      params.n_banios = this.banos;
    }
    if (this.extras.jardin !== undefined && this.extras.jardin !== null) {
      params.jardin = this.extras.jardin;
    }
    if (this.extras.piscina !== undefined && this.extras.piscina !== null) {
      params.piscina = this.extras.piscina;
    }
    if (this.tamanoMin !== undefined && this.tamanoMin !== null) {
      params.tamanio_min = this.tamanoMin;
    }
    if (this.tamanoMax !== undefined && this.tamanoMax !== null) {
      params.tamanio_max = this.tamanoMax;
    }

    // Llamar al servicio con los parámetros filtrados
    this.casasService.obtenerCasas2(
      this.tipo_preferencia, // tipo
      this.provincia,       // provincia
      this.localidad,       // localidad
      this.precioMin ?? null,       // precio_min (convert undefined to null)
      this.precioMax ?? null,       // precio_max (convert undefined to null)
      this.habitaciones ?? null,    // n_habitaciones (convert undefined to null)
      this.banos ?? null,           // n_banios (convert undefined to null)
      this.extras.jardin ?? null,   // jardin (convert undefined to null)
      this.extras.piscina ?? null,  // piscina (convert undefined to null)
      this.tamanoMin ?? null,       // tamanio_min (convert undefined to null)
      this.tamanoMax ?? null
    ).subscribe(
      (data) => {
        this.propiedades = data;
      },
      (error) => {
        this.error = 'Hubo un error al obtener las casas.';
        console.error(error);
      }
    );
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

  navigateToPropiedad(id: number): void {
    localStorage.setItem('selectedProperty', JSON.stringify({ id, tipo_propiedad: this.tipo_propiedad }));
    this.route.navigate(['/propiedad']);
  }


}
