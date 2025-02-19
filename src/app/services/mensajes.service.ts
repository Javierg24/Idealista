import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mensaje {
  id_mensaje?: number;
  id_remitente: number;
  id_destinatario: number;
  contenido: string;
  fecha_envio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  private apiUrl = 'http://localhost/idealista-api/controllers/mensajes.php';

  constructor(private http: HttpClient) {}

  // Obtener todos los mensajes entre dos usuarios
  obtenerMensajesPorChat(id_remitente: number, id_destinatario: number): Observable<Mensaje[]> {
    const params = new HttpParams()
      .set('id_emisor', id_remitente)
      .set('id_receptor', id_destinatario);
    return this.http.get<Mensaje[]>(this.apiUrl, { params });
  }

  // Obtener mensajes recientes después de una fecha específica
  obtenerMensajesDespuesDe(id_remitente: number, id_destinatario: number, fechaUltimoMensaje: string): Observable<Mensaje[]> {
    const params = new HttpParams()
      .set('id_emisor', id_remitente)
      .set('id_receptor', id_destinatario)
      .set('fechaUltimoMensaje', fechaUltimoMensaje);
    return this.http.get<Mensaje[]>(this.apiUrl, { params });
  }

  // Enviar un nuevo mensaje
  enviarMensaje(id_remitente: number, id_destinatario: number, contenido: string): Observable<any> {
    const data = { id_emisor: id_remitente, id_receptor: id_destinatario, contenido };
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar un mensaje
  actualizarMensaje(id_mensaje: number, contenido: string): Observable<any> {
    const data = { id_mensaje, contenido };
    return this.http.put<any>(this.apiUrl, data);
  }

  // Eliminar un mensaje
  eliminarMensaje(id_mensaje: number): Observable<any> {
    return this.http.request<any>('DELETE', this.apiUrl, {
      body: { id_mensaje },
    });
  }
}
