import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasasService, Casa } from 'src/app/services/casas.service';
import { PisosService, Piso } from 'src/app/services/pisos.service';
import { OficinasService, Oficina } from 'src/app/services/oficinas.service';
import { LocalesComercialesService, LocalComercial } from 'src/app/services/locales-comerciales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.scss']
})
export class CrearAnuncioComponent {
  anuncioForm: FormGroup;
  tipoPropiedad = 'casa'; // Valor por defecto
  loading = false;
  usuarioAutenticado: any = null;

  constructor(
    private fb: FormBuilder,
    private casasService: CasasService,
    private pisosService: PisosService,
    private oficinasService: OficinasService,
    private localesService: LocalesComercialesService,
    private router: Router
  ) {
    this.anuncioForm = this.fb.group({
      tipo: ['casa', Validators.required], // Selector de tipo de propiedad
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      id_provincia: ['', Validators.required],
      id_localidad: ['', Validators.required],
      tamanio: ['', [Validators.required, Validators.min(1)]],
      id_usuario: [''], // Simulación de usuario autenticado

      // Campos específicos por tipo de propiedad
      n_habitaciones: [''],
      n_banios: [''],
      jardin: [false],
      piscina: [false],
      planta: [''],
      zona_comercial: [false],
      tipo_negocio: [''],
      zona_transitada: [false],
    });

    this.anuncioForm.get('tipo')?.valueChanges.subscribe((tipo) => {
      this.tipoPropiedad = tipo;
    });
  }

  ngOnInit() {
    // Obtener usuario autenticado desde localStorage
    const usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) {
      this.usuarioAutenticado = JSON.parse(usuarioStorage);
      this.anuncioForm.patchValue({ id_usuario: this.usuarioAutenticado.id_usuario });
    } else {
      // Redirigir a login si no hay usuario autenticado
      this.router.navigate(['/login']);
    }
  }


  onSubmit() {
    if (this.anuncioForm.valid) {
      this.loading = true;
      const formData = this.anuncioForm.value;

      switch (this.tipoPropiedad) {
        case 'casa':
          const casa: Casa = { ...formData };
          this.casasService.agregarCasa(casa).subscribe(() => {
            this.router.navigate(['/']);
          });
          break;

        case 'piso':
          const piso: Piso = { ...formData };
          this.pisosService.agregarPiso(piso).subscribe(() => {
            this.router.navigate(['/']);
          });
          break;

        case 'oficina':
          const oficina: Oficina = { ...formData };
          this.oficinasService.agregarOficina(oficina).subscribe(() => {
            this.router.navigate(['/']);
          });
          break;

        case 'local':
          const local: LocalComercial = { ...formData };
          this.localesService.agregarLocal(local).subscribe(() => {
            this.router.navigate(['/']);
          });
          break;
      }
    }
  }
}
