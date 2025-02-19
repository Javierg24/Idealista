import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocalComercial {
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
  tipo_negocio: string;
  zona_transitada: boolean;
  fecha_publicacion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalesComercialesService {
  private apiUrl = 'http://localhost/idealista/controller/LocalesController.php';

  constructor(private http: HttpClient) {}

  // Obtener todos los locales comerciales filtrados por tipo, provincia y localidad
  obtenerLocales(tipo: string, id_provincia: number, id_localidad: number): Observable<LocalComercial[]> {
    const params = new HttpParams()
      .set('tipo', tipo)
      .set('id_provincia', id_provincia)
      .set('id_localidad', id_localidad);

    return this.http.get<LocalComercial[]>(this.apiUrl, { params });
  }

  // Obtener un local comercial por su ID
  obtenerLocalPorId(id: number): Observable<LocalComercial> {
    return this.http.get<LocalComercial>(`${this.apiUrl}?id=${id}`);
  }

  // Agregar un nuevo local comercial
  agregarLocal(local: LocalComercial): Observable<any> {
    return this.http.post<any>(this.apiUrl, local);
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
