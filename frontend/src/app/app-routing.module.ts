import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from './auth/has-role.guard';
import { IsLoggedInGuard } from './auth/is-logged-in.guard';
import { TIPOS } from './auth/tipos.enum';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NuevoProyectoUsuarioComponent } from './pages/proyectos-usuarios/nuevo-proyecto-usuario/nuevo-proyecto-usuario.component';
import { ProyectosUsuariosComponent } from './pages/proyectos-usuarios/proyectos-usuarios.component';
import { EditarProyectoComponent } from './pages/proyectos/editar-proyecto/editar-proyecto.component';
import { NuevoProyectoComponent } from './pages/proyectos/nuevo-proyecto/nuevo-proyecto.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { EditarUsuarioComponent } from './pages/usuarios/editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './pages/usuarios/nuevo-usuario/nuevo-usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'proyectos/editar-proyecto',
    component: EditarProyectoComponent,
    canActivate: [IsLoggedInGuard, HasRoleGuard],
    data: {
      tipos: [TIPOS.SUPERUSUARIO]
    }
  },
  {
    path: 'proyectos/nuevo',
    component: NuevoProyectoComponent,
    canActivate: [IsLoggedInGuard, HasRoleGuard],
    data: {
      tipos: [TIPOS.SUPERUSUARIO]
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'usuarios/editar',
    component: EditarUsuarioComponent,
    canActivate: [IsLoggedInGuard, HasRoleGuard],
    data: {
      tipos: [TIPOS.SUPERUSUARIO]
    }
  },
  {
    path: 'usuarios/nuevo',
    component: NuevoUsuarioComponent,
    canActivate: [IsLoggedInGuard, HasRoleGuard],
    data: {
      tipos: [TIPOS.SUPERUSUARIO]
    }
  },
  {
    path: 'proyectos-usuarios',
    component: ProyectosUsuariosComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'proyectos-usuarios/nuevo',
    component: NuevoProyectoUsuarioComponent,
    canActivate: [IsLoggedInGuard, HasRoleGuard],
    data: {
      tipos: [TIPOS.SUPERUSUARIO]
    }
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
