import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id_usuario?: number;
  nombre: string;
  correo: string;
  telefono: string;
  tipo_usuario: 'comprador' | 'vendedor' | 'agente';
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost/idealista-api/controllers/usuarios.php';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener usuario por ID
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}?id_usuario=${id}`);
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: Usuario, contrasenia: string): Observable<any> {
    const body = { ...usuario, contrasenia };
    return this.http.post<any>(this.apiUrl, body);
  }

  // Actualizar datos del usuario
  actualizarUsuario(id: number, nombre: string, correo: string): Observable<any> {
    const body = { id_usuario: id, nombre, correo };
    return this.http.put<any>(this.apiUrl, body);
  }

  // Actualizar contraseña del usuario
  actualizarContrasenia(id: number, contrasenia: string): Observable<any> {
    const body = { id_usuario: id, contrasenia };
    return this.http.post<any>(`${this.apiUrl}?action=updatePassword`, body);
  }

  // Eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id_usuario=${id}`);
  }

  // Iniciar sesión
  login(correo: string, contrasenia: string): Observable<any> {
    const body = { correo, contrasenia };
    return this.http.post<any>(`${this.apiUrl}?action=login`, body);
  }
}
