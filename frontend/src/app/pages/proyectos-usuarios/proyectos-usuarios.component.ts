import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectosUsuariosResponse } from 'src/app/api/models/ProyectosUsuariosResponse';
import { EditResourceService } from 'src/app/api/resources/edit-resource.service';
import { GetResourceService } from 'src/app/api/resources/get-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TIPOS } from 'src/app/auth/tipos.enum';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proyectos-usuarios',
  templateUrl: './proyectos-usuarios.component.html',
  styleUrls: ['./proyectos-usuarios.component.css']
})

export class ProyectosUsuariosComponent implements OnInit {

  proyectosUsuarios: ProyectosUsuariosResponse;

  fin: boolean;
  error: boolean;

  constructor(public _authService: AuthService, private _getResource: GetResourceService, private _editResource: EditResourceService, private _router: Router, private _dataService: DataService) {
    this.fin = false;
    this.error = false;
  }


  ngOnInit(): void {
    this.getProyectosUsuarios();
  }

  addProyectoUsuario() {
    this._router.navigateByUrl("/proyectos-usuarios/nuevo");
  }

  getProyectosUsuarios() {
    this._getResource.getProyectosUsuarios(this._authService.getAccessToken()).subscribe((res: ProyectosUsuariosResponse) => {
      if (res.status == 0) {
        this.proyectosUsuarios = res;
      }
    });
  }

  cerrarAlerta() {
    this.fin = false;
    this.error = false;
  }
  
  public get tipos(): typeof TIPOS {
    return TIPOS;
  }
}
