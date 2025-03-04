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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { PublicarAnuncioInfoComponent } from './publicar-anuncio/publicar-anuncio-info/publicar-anuncio-info.component';
import { CrearAnuncioComponent } from './publicar-anuncio/crear-anuncio/crear-anuncio.component';
import { NoticiasComponent } from './noticias/noticias.component';

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
    HeaderYellowComponent,
    LoginComponent,
    RegistroComponent,
    PublicarAnuncioInfoComponent,
    CrearAnuncioComponent,
    NoticiasComponent

  ],
  imports: [
    FormsModule, 
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
