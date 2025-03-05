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
  tipo_negocio: string | null = null;
  tipoPropiedad: string[] = [];
  zona_transitada: boolean = false;



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

// Método para actualizar el filtro de habitaciones
actualizarHabitaciones(opcion: number): void {
  this.habitaciones = opcion; // Asignar el valor numérico directamente
  this.actualizarFiltros(); // Ejecutar la consulta
}

// Método para actualizar el filtro de baños
actualizarBanos(opcion: number): void {
  this.banos = opcion; // Asignar el valor numérico directamente
  this.actualizarFiltros(); // Ejecutar la consulta

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
    this.cargarPropiedades();
  }

  actualizarFiltros(): void {

    // Verificar si los filtros están correctamente actualizados
    console.log("Filtros actualizados:", {
      tipo: this.tipo_preferencia,
      provincia: this.provincia,
      localidad: this.localidad,
      tipo_propiedad: this.tipo_propiedad,
      precioMin: this.precioMin,
      precioMax: this.precioMax,
      tamanoMin: this.tamanoMin,
      tamanoMax: this.tamanoMax,
      habitaciones: this.habitaciones,
      banos: this.banos,
      extras: this.extras,
      planta: this.planta,
      zona_comercial: this.zona_comercial,
      tipo_negocio: this.tipo_negocio,
      zona_transitada: this.zona_transitada
    });

    // Emitir el cambio de filtros para ejecutar la carga de propiedades
    this.filtrosChanged.next();
    this.cargarCasas2();
  }

  buscarPropiedades(): void {
    this.actualizarFiltros(); // Update filters and trigger the property loading
  }

  // Método para cargar las propiedades según los filtros seleccionados
  cargarPropiedades(): void {
    if (this.tipo_propiedad === 'casas') {
      this.cargarCasas2();
    } else if (this.tipo_propiedad === 'pisos') {
      this.cargarPisos2();
    } else if (this.tipo_propiedad === 'locales') {
      this.cargarLocales2();
    } else if (this.tipo_propiedad === 'oficinas') {
      this.cargarOficinas2();
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
        console.log(this.propiedades);
      },
      (error) => {
        this.error = 'Hubo un error al obtener las casas.';
        console.error(error);
      }
    );
  }


  cargarPisos2(): void {
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
    if (this.planta !== undefined && this.planta !== null) {
      params.planta = this.planta;
    }
    if (this.tamanoMin !== undefined && this.tamanoMin !== null) {
      params.tamanio_min = this.tamanoMin;
    }
    if (this.tamanoMax !== undefined && this.tamanoMax !== null) {
      params.tamanio_max = this.tamanoMax;
    }

    // Llamar al servicio con los parámetros filtrados
    this.pisosService.obtenerPisos2(
      this.tipo_preferencia,  // tipo
      this.provincia,         // provincia
      this.localidad,         // localidad
      this.precioMin ?? null, // precio_min
      this.precioMax ?? null, // precio_max
      this.habitaciones ?? null, // n_habitaciones
      this.banos ?? null,        // n_banios
      this.planta ?? null,        // planta
      this.tamanoMin ?? null,       // tamanio_min (convert undefined to null)
      this.tamanoMax ?? null
    ).subscribe(
      (data) => {
        this.propiedades = data;
        console.log(data);
      },
      (error) => {
        this.error = 'Hubo un error al obtener los pisos.';
        console.error(error);
      }
    );

    console.log(params);
  }

  cargarOficinas2(): void {
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
    if (this.n_salas !== undefined && this.n_salas !== null) {
      params.n_salas = this.n_salas;
    }
    if (this.planta !== undefined && this.planta !== null) {
      params.planta = this.planta;
    }
    if (this.zona_comercial !== undefined && this.zona_comercial !== null) {
      params.zona_comercial = this.zona_comercial;
    }
    if (this.tamanoMin !== undefined && this.tamanoMin !== null) {
      params.tamanio_min = this.tamanoMin;
    }
    if (this.tamanoMax !== undefined && this.tamanoMax !== null) {
      params.tamanio_max = this.tamanoMax;
    }

    // Llamar al servicio con los parámetros filtrados
    this.oficinasService.obtenerOficinas2(
      this.tipo_preferencia,    // tipo
      this.provincia,           // provincia
      this.localidad,           // localidad
      this.precioMin ?? null,   // precio_min
      this.precioMax ?? null,   // precio_max
      this.n_salas ?? null,     // n_salas
      this.planta ?? null,      // planta
      this.zona_comercial ?? null, // zona_comercial
      this.tamanoMin ?? null,       // tamanio_min (convert undefined to null)
      this.tamanoMax ?? null
    ).subscribe(
      (data) => {
        this.propiedades = data;
        console.log(data);
      },
      (error) => {
        this.error = 'Hubo un error al obtener las oficinas.';
        console.error(error);
      }
    );

    console.log(params);
  }

  cargarLocales2(): void {
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
    if (this.zona_transitada !== undefined && this.zona_transitada !== null) {
      params.zona_transitada = this.zona_transitada;
    }
    if (this.tipo_negocio !== undefined && this.tipo_negocio !== null) {
      params.tipo_negocio = this.tipo_negocio;
    }
    if (this.tamanoMin !== undefined && this.tamanoMin !== null) {
      params.tamanio_min = this.tamanoMin;
    }
    if (this.tamanoMax !== undefined && this.tamanoMax !== null) {
      params.tamanio_max = this.tamanoMax;
    }


    // Llamar al servicio con los parámetros filtrados
    this.localesService.obtenerLocales2(
      this.tipo_preferencia,    // tipo
      this.provincia,           // provincia
      this.localidad,           // localidad
      this.precioMin ?? null,   // precio_min
      this.precioMax ?? null,   // precio_max
      this.zona_transitada ?? null, // zona_transitada
      this.tipo_negocio ?? undefined, // tipo_negocio
      this.tamanoMin ?? null,       // tamanio_min (convert undefined to null)
      this.tamanoMax ?? null
    ).subscribe(
      (data) => {
        this.propiedades = data;
        console.log(data);
      },
      (error) => {
        this.error = 'Hubo un error al obtener los locales comerciales.';
        console.error(error);
      }
    );

    console.log(params);
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
