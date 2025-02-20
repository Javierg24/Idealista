import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  cargando: boolean = false; //  Nueva variable para mostrar el spinner

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.cargando = true; //  Iniciar el spinner

      const { correo, contrasenia } = this.loginForm.value;
      this.usuarioService.login(correo, contrasenia).subscribe(
        response => {
          this.cargando = false; //  Detener el spinner cuando recibimos respuesta

          if (response.success) {
            localStorage.setItem('usuario', JSON.stringify(response.usuario));
            this.router.navigate(['/']);
          } else {
            alert('Credenciales incorrectas');
          }
        },
        error => {
          this.cargando = false; //  Detener el spinner en caso de error
          console.error('Error en la autenticación', error);
        }
      );
    }
  }
}
