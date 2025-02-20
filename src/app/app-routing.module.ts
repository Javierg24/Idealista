import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { PropiedadComponent } from './propiedad/propiedad.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { PublicarAnuncioInfoComponent } from './publicar-anuncio/publicar-anuncio-info/publicar-anuncio-info.component';
import { CrearAnuncioComponent } from './publicar-anuncio/crear-anuncio/crear-anuncio.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'provincia', component: ProvinciaComponent },
  { path: 'propiedades', component: PropiedadesComponent },
  { path: 'propiedad', component: PropiedadComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'publicar-anuncio-info', component: PublicarAnuncioInfoComponent },
  { path: 'crear-anuncio', component: CrearAnuncioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
