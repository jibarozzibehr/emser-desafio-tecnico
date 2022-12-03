import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { EditarProyectoComponent } from './pages/proyectos/editar-proyecto/editar-proyecto.component';
import { NuevoProyectoComponent } from './pages/proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EditarUsuarioComponent } from './pages/usuarios/editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './pages/usuarios/nuevo-usuario/nuevo-usuario.component';
import { ProyectosUsuariosComponent } from './pages/proyectos-usuarios/proyectos-usuarios.component';
import { NuevoProyectoUsuarioComponent } from './pages/proyectos-usuarios/nuevo-proyecto-usuario/nuevo-proyecto-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DarkModeToggleComponent,
    ProyectosComponent,
    EditarProyectoComponent,
    NuevoProyectoComponent,
    UsuariosComponent,
    EditarUsuarioComponent,
    NuevoUsuarioComponent,
    ProyectosUsuariosComponent,
    NuevoProyectoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
