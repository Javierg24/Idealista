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

  // Obtener un piso por su ID
  obtenerPisoPorId(id: number): Observable<Piso> {
    return this.http.get<Piso>(`${this.apiUrl}?id_propiedad=${id}`);
  }

  // Agregar un nuevo piso
  agregarPiso(piso: Piso): Observable<any> {
    return this.propiedadesService.agregarPropiedad(piso).pipe(
      switchMap((response) => {
        if (response.success && response.id_propiedad) {
          const nuevoPiso: Piso = { ...piso, id_propiedad: response.id_propiedad };
          return this.http.post<any>(this.apiUrl, nuevoPiso);
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

