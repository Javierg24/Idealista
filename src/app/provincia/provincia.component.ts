import { Component, OnInit } from '@angular/core';
import { LocalidadesService } from '../services/localidades.service'; // Ajusta la ruta según tu estructura de carpetas
import { Router } from '@angular/router';
import { Provincia } from '../model/Provincia';
import { Localidad } from '../model/Localidad';
import { PropiedadFiltro } from '../model/PropiedadFiltro';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss']
})
export class ProvinciaComponent implements OnInit {
  provincia = "Madrid"; // La provincia seleccionada
  tipoPropiedad = "vivienda"; // Tipo de propiedad (lo puedes usar para filtrar más adelante si es necesario)
  tipoPreferencia = 'venta';
  localidades: Localidad[] = []; // Lista de localidades que se actualizará con los datos del servicio
  error: string = ''; // Para manejar errores
  filtro: PropiedadFiltro | null = null;

  constructor(private route: Router,private localidadesService: LocalidadesService) {}

  ngOnInit(): void {
    const propFiltro = localStorage.getItem('selectedOptions');
    let prov: Provincia | null = null;
    if(propFiltro){
      this.filtro = JSON.parse(propFiltro);
      if(this.filtro){
        prov = this.filtro.provincia;
        this.provincia = this.filtro.provincia.nombre;
        this.tipoPropiedad = this.filtro.tipo_propiedad.toLowerCase();
        if(this.filtro.tipo_preferencia.toLowerCase() === 'comprar'){
          this.tipoPreferencia = 'venta';
        } else {
          this.tipoPreferencia = this.filtro.tipo_preferencia.toLowerCase();
        } 
      }
    }
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

  navigateToPropiedades(localidad: Localidad): void{
    if(this.filtro){
      this.filtro.localidad = localidad;
      localStorage.setItem('selectedOptions',JSON.stringify(this.filtro));
      this.route.navigate(['/propiedad']);
    }
  }
}
