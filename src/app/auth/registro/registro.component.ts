import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tipo_usuario: ['comprador', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;
      this.usuarioService.registrarUsuario(usuario, usuario.contrasenia).subscribe(
        response => {
          if (response.success) {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            this.router.navigate(['/login']);
          } else {
            alert('Error al registrarse');
          }
        },
        error => {
          console.error('Error en el registro', error);
        }
      );
    }
  }
}
