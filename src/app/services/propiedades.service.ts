import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Propiedad {
  id_propiedad?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  ubicacion: string;
  tamanio: number;
  id_usuario: number;
  tipo: string;
  id_provincia: number;
  id_localidad: number;
  fecha_publicacion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PropiedadesService {
  private apiUrl = 'http://localhost/idealista-api/controllers/propiedades.php';

  constructor(private http: HttpClient) {}

  // Obtener todas las propiedades
  obtenerPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  // Obtener una propiedad por su ID
  obtenerPropiedadPorId(id: number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.apiUrl}?id_propiedad=${id}`);
  }

  // Obtener propiedades por tipo, provincia y localidad
  obtenerPropiedadesFiltradas(tipo: string, id_provincia: number, id_localidad: number): Observable<Propiedad[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', id_provincia)
      .set('id_localidad', id_localidad);

    return this.http.get<Propiedad[]>(this.apiUrl, { params });
  }

  // Agregar una nueva propiedad
  agregarPropiedad(propiedad: Propiedad): Observable<any> {
    return this.http.post<any>(this.apiUrl, propiedad);
  }

  // Actualizar una propiedad existente
  actualizarPropiedad(propiedad: Propiedad): Observable<any> {
    return this.http.put<any>(this.apiUrl, propiedad);
  }

  // Eliminar una propiedad por su ID
  eliminarPropiedad(id: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, { body: { id_propiedad: id } });
  }
}
