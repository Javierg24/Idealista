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
    tipo?: string,
    id_provincia?: number,
    id_localidad?: number,
    precio_min?: number,
    precio_max?: number,
    zona_transitada?: boolean,
    tipo_negocio?: string
  ): Observable<LocalComercial[]> {
    let params = new HttpParams();

    if (tipo) params = params.set('tipo', tipo);
    if (id_provincia) params = params.set('id_provincia', id_provincia);
    if (id_localidad) params = params.set('id_localidad', id_localidad);
    if (precio_min !== undefined) params = params.set('precio_min', precio_min);
    if (precio_max !== undefined) params = params.set('precio_max', precio_max);
    if (zona_transitada !== undefined) params = params.set('zona_transitada', zona_transitada.toString());
    if (tipo_negocio) params = params.set('tipo_negocio', tipo_negocio);

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
          const nuevoLocal: LocalComercial = { ...local, id_propiedad: response.id_propiedad };
          return this.http.post<any>(this.apiUrl, nuevoLocal);
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
