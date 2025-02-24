import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasasService, Casa } from 'src/app/services/casas.service';
import { PisosService, Piso } from 'src/app/services/pisos.service';
import { OficinasService, Oficina } from 'src/app/services/oficinas.service';
import { LocalesComercialesService, LocalComercial } from 'src/app/services/locales-comerciales.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Provincia } from 'src/app/model/Provincia';
import { Localidad } from 'src/app/model/Localidad';

@Component({
  selector: 'app-crear-anuncio',
  templateUrl: './crear-anuncio.component.html',
  styleUrls: ['./crear-anuncio.component.scss']
})
export class CrearAnuncioComponent implements OnInit {
  anuncioForm: FormGroup;
  tipoPropiedad = 'casa'; // Valor por defecto
  loading = false;
  usuarioAutenticado: any = null;

  provincias$: Observable<Provincia[]> = new Observable();
  localidades$: Observable<Localidad[]> = new Observable();
  tipoOpciones = ['Alquiler', 'Comprar', 'Compartir'];

  constructor(
    private fb: FormBuilder,
    private casasService: CasasService,
    private pisosService: PisosService,
    private oficinasService: OficinasService,
    private localesService: LocalesComercialesService,
    private provinciasService: ProvinciasService,
    private localidadesService: LocalidadesService,
    private router: Router
  ) {
    this.anuncioForm = this.fb.group({
      tipo: ['casa', Validators.required], // Tipo de propiedad
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      tipoOperacion: ['Alquiler', Validators.required], // Compra, Alquiler, Compartir
      id_provincia: ['', Validators.required],
      id_localidad: ['', Validators.required],
      tamanio: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', Validators.required], // Nueva propiedad para ubicación
      id_usuario: [''], // Se asigna en `ngOnInit`

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

    this.anuncioForm.get('id_provincia')?.valueChanges.subscribe((provinciaId) => {
      if (provinciaId) {
        this.localidades$ = this.localidadesService.obtenerLocalidadesPorProvincia(provinciaId);
      }  
      });
  }

  ngOnInit() {
    // Obtener usuario autenticado desde localStorage
    const usuarioStorage = localStorage.getItem('usuario');
  
    if (usuarioStorage) {
      const usuarios = JSON.parse(usuarioStorage); // Parsea el JSON
      this.usuarioAutenticado = Array.isArray(usuarios) ? usuarios[0] : usuarios; // Tomar el primer usuario si es un array
  
      console.log("Usuario autenticado:", this.usuarioAutenticado);
      console.log("ID Usuario:", this.usuarioAutenticado?.id_usuario);
  
      if (this.usuarioAutenticado?.id_usuario) {
        this.anuncioForm.patchValue({ id_usuario: this.usuarioAutenticado.id_usuario });
      } else {
        console.warn("No se pudo obtener el ID del usuario.");
        this.router.navigate(['/login']);
      }
    } else {
      console.warn("No se encontró usuario autenticado, redirigiendo a login.");
      this.router.navigate(['/login']);
    }
  
    // Cargar provincias
    this.provincias$ = this.provinciasService.obtenerTodasLasProvincias();
  }
  

  onSubmit() {
    if (this.anuncioForm.valid) {
      this.loading = true;

      const formData = { ...this.anuncioForm.value, id_usuario: this.usuarioAutenticado?.id_usuario };

      console.log("Datos enviados al backend:", formData);

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
