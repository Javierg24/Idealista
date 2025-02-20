import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { ProvinciasService } from '../services/provincias.service';
import { Provincia } from '../model/Provincia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  provinciaControl = new FormControl('');
  provincias: Provincia[] = [];
  filteredProvincias$: Observable<Provincia[]> = new Observable();

  constructor(private provinciasService: ProvinciasService) {}

  ngOnInit() {
    this.filteredProvincias$ = this.provinciaControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Para evitar muchas peticiones en poco tiempo
      switchMap(value => this.filtrarProvincias(value || ''))
    );
  }

  private filtrarProvincias(termino: string): Observable<Provincia[]> {
    return this.provinciasService.obtenerTodasLasProvincias().pipe(
      map(provincias => 
        provincias.filter((provincia:Provincia) => 
          provincia.nombre.toLowerCase().includes(termino.toLowerCase())
        )
      )
    );
  }
}