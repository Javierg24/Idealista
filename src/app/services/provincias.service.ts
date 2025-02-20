import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../model/Provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
  private apiUrl = 'http://localhost/idealista/PHP/controller/ProvinciasController.php'; // Cambia la URL según tu configuración

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las provincias
   * @returns Observable con la lista de provincias
   */
  obtenerTodasLasProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.apiUrl);
  }

  /**
   * Obtiene una provincia por su ID
   * @param id - ID de la provincia
   * @returns Observable con los datos de la provincia
   */
  obtenerProvinciaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

  obtenerProvinciasPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?nombre=${nombre}`);
  }
}
