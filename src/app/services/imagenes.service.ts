import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Imagen {
  id_imagen?: number;
  url_imagen: string;
  id_propiedad: number;
  imagenBase64?: string; // Para subida de imágenes en base64
}

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private apiUrl = 'http://localhost/idealista/controller/ImagenesController.php';

  constructor(private http: HttpClient) {}

  // Obtener todas las imágenes
  obtenerTodasLasImagenes(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.apiUrl);
  }

  // Obtener imágenes de una propiedad específica
  obtenerImagenesDePropiedad(id_propiedad: number): Observable<Imagen[]> {
    const params = new HttpParams().set('id_propiedad', id_propiedad);
    return this.http.get<Imagen[]>(this.apiUrl, { params });
  }

  // Subir una nueva imagen (Base64)
  subirImagen(nombre_imagen: string, id_propiedad: number, imagenBase64: string): Observable<any> {
    const data = { nombre_imagen, id_propiedad, imagenBase64 };
    return this.http.post<any>(this.apiUrl, data);
  }

  // Eliminar una imagen
  eliminarImagen(id_imagen: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, {
      body: { id_imagen },
    });
  }
}
