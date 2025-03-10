import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { Propiedad, PropiedadesService } from './propiedades.service';

export interface LocalComercial extends Propiedad {
  tipo_negocio: string;
  zona_transitada: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LocalesComercialesService {
  private apiUrl = 'http://localhost/idealista/PHP/controller/LocalesController.php';

  constructor(private http: HttpClient, private propiedadesService: PropiedadesService) { }

  // Obtener todos los locales comerciales filtrados por tipo, provincia y localidad
  obtenerLocales(tipo: string, id_provincia: number, id_localidad: number): Observable<LocalComercial[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', id_provincia)
      .set('id_localidad', id_localidad);

    return this.http.get<LocalComercial[]>(this.apiUrl, { params });
  }

  // Obtener locales comerciales con filtros avanzados
  obtenerLocales2(
    tipo: string | undefined,
    id_provincia: number | undefined,
    id_localidad: number | undefined,
    precio_min: number | null,
    precio_max: number | null,
    zona_transitada: boolean | null,
    tipo_negocio: string | undefined,
    tamanio_min: number | null,
    tamanio_max: number | null
  ): Observable<LocalComercial[]> {
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
    if (zona_transitada !== null && zona_transitada !== undefined) {
      params = params.set('zona_transitada', zona_transitada ? '1' : '0');
    }
    if (tipo_negocio !== undefined) {
      params = params.set('tipo_negocio', tipo_negocio);
    }
    if (tamanio_min !== null && tamanio_min !== undefined) {
      params = params.set('tamanio_min', tamanio_min.toString());
    }
    if (tamanio_max !== null && tamanio_max !== undefined) {
      params = params.set('tamanio_max', tamanio_max.toString());
    }


    return this.http.get<LocalComercial[]>(this.apiUrl, { params });
  }



  // Obtener un local comercial por su ID
  obtenerLocalPorId(id: number): Observable<LocalComercial> {
    return this.http.get<LocalComercial>(`${this.apiUrl}?id=${id}`);
  }

 // Agregar un nuevo local comercial
 agregarLocal(local: LocalComercial): Observable<any> {
  return this.propiedadesService.agregarPropiedad(local).pipe(
    switchMap((response) => {
      if (response.success && response.id_propiedad) {
        const idPropiedad = Number(response.id_propiedad);
        const nuevoLocal: LocalComercial = { ...local, id_propiedad: idPropiedad };

        return this.http.post<any>(this.apiUrl, nuevoLocal).pipe(
          switchMap((localResponse) => {
            if (localResponse.success) {
              return new Observable((observer) => {
                observer.next({
                  success: true,
                  id_propiedad: idPropiedad,
                  ...localResponse
                });
                observer.complete();
              });
            } else {
              return throwError(() => new Error("Error al registrar el local"));
            }
          })
        );
      } else {
        return throwError(() => new Error("Error al insertar la propiedad"));
      }
    })
  );
}


  // Actualizar un local comercial existente
  actualizarLocal(local: LocalComercial): Observable<any> {
    return this.http.put<any>(this.apiUrl, local);
  }

  // Eliminar un local comercial por su ID
  eliminarLocal(id: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, { body: { id_propiedad: id } });
  }
}
