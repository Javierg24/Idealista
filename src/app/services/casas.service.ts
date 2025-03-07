import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { Propiedad, PropiedadesService } from './propiedades.service';

export interface Casa extends Propiedad {
  n_habitaciones: number;
  n_banios: number;
  jardin: boolean;
  piscina: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CasasService {
  private apiUrl = 'http://localhost/idealista/PHP/controller/CasasController.php';

  constructor(private http: HttpClient, private propiedadesService: PropiedadesService) { }

  // Obtener todas las casas filtradas por tipo, provincia y localidad
  obtenerCasas(tipo: string, id_provincia: number, id_localidad: number): Observable<Casa[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', id_provincia)
      .set('id_localidad', id_localidad);

    return this.http.get<Casa[]>(this.apiUrl, { params });
  }

  // Obtener una casa por su ID
  obtenerCasaPorId(id: number): Observable<Casa> {
    return this.http.get<Casa>(`${this.apiUrl}?id=${id}`);
  }


  // Obtener casas con filtros avanzados
  obtenerCasas2(
    tipo: string,
    provincia: number,
    localidad: number,
    precio_min: number | null,
    precio_max: number | null,
    n_habitaciones: number | null,
    n_banios: number | null,
    jardin: boolean | null,
    piscina: boolean | null,
    tamanio_min: number | null,
    tamanio_max: number | null
  ): Observable<any> {
    let params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', provincia.toString())
      .set('id_localidad', localidad.toString());

    // Añadir parámetros solo si no son nulos o indefinidos
    if (precio_min !== null && precio_min !== undefined) {
      params = params.set('precio_min', precio_min.toString());
    }
    if (precio_max !== null && precio_max !== undefined) {
      params = params.set('precio_max', precio_max.toString());
    }
    if (n_habitaciones !== null && n_habitaciones !== undefined) {
      params = params.set('n_habitaciones', n_habitaciones.toString());
    }
    if (n_banios !== null && n_banios !== undefined) {
      params = params.set('n_banios', n_banios.toString());
    }
    if (jardin !== null && jardin !== undefined) {
      params = params.set('jardin', jardin ? '1' : '0');
    }
    if (piscina !== null && piscina !== undefined) {
      params = params.set('piscina', piscina ? '1' : '0');
    }
    if (tamanio_min !== null && tamanio_min !== undefined) {
      params = params.set('tamanio_min', tamanio_min.toString());
    }
    if (tamanio_max !== null && tamanio_max !== undefined) {
      params = params.set('tamanio_max', tamanio_max.toString());
    }

    console.log(params);
        const url = `http://localhost/idealista/PHP/controller/CasasController.php?${params.toString()}`;
    console.log('URL final:', url);

    return this.http.get<any[]>(this.apiUrl, { params });


  }

  // Agregar una nueva casa
  agregarCasa(casa: Casa): Observable<any> {
    return this.propiedadesService.agregarPropiedad(casa).pipe(
      switchMap((response) => {
        if (response.success && response.id_propiedad) {
          const nuevaCasa: Casa = { ...casa, id_propiedad: response.id_propiedad };
          return this.http.post<any>(this.apiUrl, nuevaCasa);
        } else {
          return throwError(() => new Error("Error al insertar la propiedad"));
        }
      })
    );
  }


  // Actualizar una casa existente
  actualizarCasa(casa: Casa): Observable<any> {
    return this.http.put<any>(this.apiUrl, casa);
  }
}
