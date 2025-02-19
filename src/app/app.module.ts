import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { PropiedadesComponent } from './propiedades/propiedades.component';
import { PropiedadComponent } from './propiedad/propiedad.component';
import { CardInmuebleComponent } from './card-inmueble/card-inmueble.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { HeaderYellowComponent } from './header-yellow/header-yellow.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    ProvinciaComponent,
    PropiedadesComponent,
    PropiedadComponent,
    CardInmuebleComponent,
    PerfilUsuarioComponent,
    HeaderYellowComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
