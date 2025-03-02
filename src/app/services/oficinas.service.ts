import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { Propiedad, PropiedadesService } from './propiedades.service';

export interface Oficina extends Propiedad {
  n_salas: number;
  planta: number;
  zona_comercial: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OficinasService {
  private apiUrl = 'http://localhost/idealista/PHP/controller/OficinasController.php';

  constructor(private http: HttpClient, private propiedadesService: PropiedadesService) {}

  // Obtener todas las oficinas filtradas por tipo, provincia y localidad
  obtenerOficinas(tipo: string, id_provincia: number, id_localidad: number): Observable<Oficina[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', id_provincia)
      .set('id_localidad', id_localidad);

    return this.http.get<Oficina[]>(this.apiUrl, { params });
  }

  // Obtener una oficina por su ID
  obtenerOficinaPorId(id: number): Observable<Oficina> {
    return this.http.get<Oficina>(`${this.apiUrl}?id_oficina=${id}`);
  }

  // Agregar una nueva oficina
  agregarOficina(oficina: Oficina): Observable<any> {
    return this.propiedadesService.agregarPropiedad(oficina).pipe(
      switchMap((response) => {
        if (response.success && response.id_propiedad) {
          const nuevaOficina: Oficina = { ...oficina, id_propiedad: response.id_propiedad };
          return this.http.post<any>(this.apiUrl, nuevaOficina);
        } else {
          return throwError(() => new Error("Error al insertar la propiedad"));
        }
      })
    );
  }
  
  // Actualizar una oficina existente
  actualizarOficina(oficina: Oficina): Observable<any> {
    return this.http.put<any>(this.apiUrl, oficina);
  }

  // Eliminar una oficina por su ID
  eliminarOficina(id: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, { body: { id_oficina: id } });
  }
}
