import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Resenia {
  id_resenia?: number;
  id_usuario: number;
  id_propiedad: number;
  calificacion: number;
  comentario: string;
  fecha_resenia?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReseniasService {
  private apiUrl = 'http://localhost/idealista-api/controllers/resenias.php';

  constructor(private http: HttpClient) {}

  // Obtener todas las reseñas
  obtenerResenias(): Observable<Resenia[]> {
    return this.http.get<Resenia[]>(this.apiUrl);
  }

  // Obtener reseñas de una propiedad específica
  obtenerReseniasPorPropiedad(id_propiedad: number): Observable<Resenia[]> {
    const params = new HttpParams().set('id_propiedad', id_propiedad);
    return this.http.get<Resenia[]>(this.apiUrl, { params });
  }

  // Agregar una nueva reseña
  agregarResenia(id_usuario: number, id_propiedad: number, calificacion: number, comentario: string): Observable<any> {
    const data = { id_usuario, id_propiedad, calificacion, comentario };
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar una reseña existente
  actualizarResenia(id_resenia: number, calificacion: number, comentario: string): Observable<any> {
    const data = { id_resena: id_resenia, calificacion, comentario };
    return this.http.put<any>(this.apiUrl, data);
  }

  // Eliminar una reseña
  eliminarResenia(id_resenia: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, {
      body: { id_resena: id_resenia },
    });
  }
}
