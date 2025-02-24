import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { Propiedad, PropiedadesService } from './propiedades.service';

export interface Casa extends Propiedad{
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

  constructor(private http: HttpClient,  private propiedadesService: PropiedadesService) {}

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
