import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Casa {
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
  n_habitaciones: number;
  n_banios: number;
  jardin: boolean;
  piscina: boolean;
  fecha_publicacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class CasasService {
  private apiUrl = 'http://localhost/idealista/PHP/controller/CasasController.php';

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(this.apiUrl, casa);
  }

  // Actualizar una casa existente
  actualizarCasa(casa: Casa): Observable<any> {
    return this.http.put<any>(this.apiUrl, casa);
  }
}
