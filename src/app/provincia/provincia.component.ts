import { Component, OnInit } from '@angular/core';
import { LocalidadesService } from '../services/localidades.service'; // Ajusta la ruta según tu estructura de carpetas

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent implements OnInit {
  provincia = "Madrid"; // La provincia seleccionada
  tipoPropiedad = "vivienda"; // Tipo de propiedad (lo puedes usar para filtrar más adelante si es necesario)
  localidades: any[] = []; // Lista de localidades que se actualizará con los datos del servicio
  error: string = ''; // Para manejar errores

  constructor(private localidadesService: LocalidadesService) {}

  ngOnInit(): void {
    this.cargarLocalidades();
  }

  // Método para cargar las localidades de la provincia
  cargarLocalidades(): void {
    const idProvincia = 1;

    this.localidadesService.obtenerLocalidadesPorProvincia(idProvincia)
      .subscribe(
        (data) => {
          this.localidades = data;
        },
        (error) => {
          this.error = 'Hubo un error al obtener las localidades.';
          console.error(error);
        }
      );
  }
}
