import { Component, OnInit } from '@angular/core';
import { LocalidadesService } from '../services/localidades.service'; // Ajusta la ruta según tu estructura de carpetas
import { ActivatedRoute } from '@angular/router';
import { Provincia } from '../model/Provincia';

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

  constructor(private route: ActivatedRoute,private localidadesService: LocalidadesService) {}

  ngOnInit(): void {
    const provString = localStorage.getItem('selectedProvincia');
    let prov: Provincia | null = null;
    if(provString){
      prov = JSON.parse(provString);
    }
    localStorage.removeItem('selectedProvincia');
    this.cargarLocalidades(prov?.id_provincia);
  }

  // Método para cargar las localidades de la provincia
  cargarLocalidades(idProvincia?: number): void {
    if(!idProvincia){
      idProvincia = 1;
    }
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
