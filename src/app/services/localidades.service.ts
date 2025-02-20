import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {
  private apiUrl: string = 'http://localhost/Idealista/PHP/controller/LocalidadesController.php'; // Cambia esto a la URL correcta

  constructor(private http: HttpClient) { }

  // Método para obtener localidades por provincia
  obtenerLocalidadesPorProvincia(idProvincia: number): Observable<any> {
    const url = `${this.apiUrl}?id_provincia=${idProvincia}`;
    return this.http.get<any>(url);
  }
}
