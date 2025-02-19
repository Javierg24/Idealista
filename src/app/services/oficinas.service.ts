import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Oficina {
  id_propiedad?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  id_provincia: number;
  id_localidad: number;
  tamanio: number;
  id_usuario: number;
  nombre: string;
  correo: string;
  n_salas: number;
  planta: number;
  zona_comercial: boolean;
  fecha_publicacion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OficinasService {
  private apiUrl = 'http://localhost/idealista-api/controllers/oficinas.php';

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(this.apiUrl, oficina);
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
