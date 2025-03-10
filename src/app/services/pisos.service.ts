import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { Propiedad, PropiedadesService } from './propiedades.service';

export interface Piso extends Propiedad {
  n_habitaciones: number;
  n_banios: number;
  planta: number;
}

@Injectable({
  providedIn: 'root',
})
export class PisosService {
  private apiUrl = 'http://localhost/idealista/PHP/controller/PisosController.php';

  constructor(private http: HttpClient, private propiedadesService: PropiedadesService) {}

  // Obtener todos los pisos filtrados por tipo, provincia y localidad
  obtenerPisos(tipo: string, id_provincia: number, id_localidad: number): Observable<Piso[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', id_provincia)
      .set('id_localidad', id_localidad);

    return this.http.get<Piso[]>(this.apiUrl, { params });
  }

  // Obtener pisos filtrados por tipo, provincia, localidad y precio
  obtenerPisos2(
    tipo: string | undefined,
    id_provincia: number | undefined,
    id_localidad: number | undefined,
    precio_min: number | null,
    precio_max: number | null,
    n_habitaciones: number | null,
    n_banios: number | null,
    planta: number | null,
    tamanio_min: number | null,
    tamanio_max: number | null
  ): Observable<Piso[]> {
    let params = new HttpParams();

    // Añadir parámetros solo si no son nulos o indefinidos
    if (tipo !== undefined) {
      params = params.set('tipo', tipo);
    }
    if (id_provincia !== undefined) {
      params = params.set('id_provincia', id_provincia.toString());
    }
    if (id_localidad !== undefined) {
      params = params.set('id_localidad', id_localidad.toString());
    }
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
    if (planta !== null && planta !== undefined) {
      params = params.set('planta', planta.toString());
    }
    if (tamanio_min !== null && tamanio_min !== undefined) {
      params = params.set('tamanio_min', tamanio_min.toString());
    }
    if (tamanio_max !== null && tamanio_max !== undefined) {
      params = params.set('tamanio_max', tamanio_max.toString());
    }

    console.log(params);
        const url = `http://localhost/idealista/PHP/controller/PisosController.php?${params.toString()}`;
    console.log('URL final:', url);


    return this.http.get<Piso[]>(this.apiUrl, { params });
  }



  // Obtener un piso por su ID
  obtenerPisoPorId(id: number): Observable<Piso> {
    return this.http.get<Piso>(`${this.apiUrl}?id_propiedad=${id}`);
  }

  // Agregar un nuevo piso
  agregarPiso(piso: Piso): Observable<any> {
    return this.propiedadesService.agregarPropiedad(piso).pipe(
      switchMap((response) => {
        if (response.success && response.id_propiedad) {
          const idPropiedad = Number(response.id_propiedad);
          const nuevoPiso: Piso = { ...piso, id_propiedad: idPropiedad };
  
          return this.http.post<any>(this.apiUrl, nuevoPiso).pipe(
            switchMap((pisoResponse) => {
              if (pisoResponse.success) {
                return new Observable((observer) => {
                  observer.next({
                    success: true,
                    id_propiedad: idPropiedad,
                    ...pisoResponse
                  });
                  observer.complete();
                });
              } else {
                return throwError(() => new Error("Error al registrar el piso"));
              }
            })
          );
        } else {
          return throwError(() => new Error("Error al insertar la propiedad"));
        }
      })
    );
  }
  
  // Actualizar un piso existente
  actualizarPiso(piso: Piso): Observable<any> {
    return this.http.put<any>(this.apiUrl, piso);
  }

  // Eliminar un piso por su ID
  eliminarPiso(id: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, { body: { id_propiedad: id } });
  }
}

