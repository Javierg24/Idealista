import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Favorito {
  id_usuario: number;
  id_propiedad: number;
}

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private apiUrl = 'http://localhost/idealista-api/controllers/favoritos.php';

  constructor(private http: HttpClient) {}

  // Obtener favoritos de un usuario
  obtenerFavoritos(id_usuario: number): Observable<Favorito[]> {
    const params = new HttpParams().set('id_usuario', id_usuario);
    return this.http.get<Favorito[]>(this.apiUrl, { params });
  }

  // Agregar un nuevo favorito
  agregarFavorito(favorito: Favorito): Observable<any> {
    return this.http.post<any>(this.apiUrl, favorito);
  }

  // Eliminar un favorito
  eliminarFavorito(id_usuario: number, id_propiedad: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, {
      body: { id_usuario, id_propiedad },
    });
  }
}
