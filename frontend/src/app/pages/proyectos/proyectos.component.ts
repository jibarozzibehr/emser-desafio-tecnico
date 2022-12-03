import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoRequest } from 'src/app/api/models/ProyectoRequest';
import { ProyectosResponse } from 'src/app/api/models/ProyectosResponse';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { DeleteResourceService } from 'src/app/api/resources/delete-resource.service';
import { EditResourceService } from 'src/app/api/resources/edit-resource.service';
import { GetResourceService } from 'src/app/api/resources/get-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TIPOS } from 'src/app/auth/tipos.enum';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  proyectos: ProyectosResponse;

  fin: boolean;
  error: boolean;

  constructor(private _getResource: GetResourceService, private _editResource: EditResourceService, private _deleteResource: DeleteResourceService, public _authService: AuthService, private _dataService: DataService, private _router: Router) {
    this.fin = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this._getResource.getProyectos(this._authService.getAccessToken()).subscribe((res) => {
      if (res.status == 0) {
        this.proyectos = res;
        console.log(this.proyectos);
      }
    });
  }

  editProyecto(id: number) {
    this._dataService.setProyectoId(id);
    this._router.navigateByUrl("/proyectos/editar-proyecto");
  }

  toggleActive(id: number) {
    this._getResource.getProyecto(this._authService.getAccessToken(), id).subscribe((res: ProyectosResponse) => {
      const proyectoRequest: ProyectoRequest = {
        accessToken: this._authService.getAccessToken(),
        id: id,
        nombre: res.project.nombre,
        activo: !res.project.activo
      };

      this._editResource.editProyecto(proyectoRequest).subscribe((res: StandardResponse) => {
        if (res.status == 0) {
          this.fin = true;
          this.getProyectos();
        } else {
          this.error = true;
        }
      });
    });
  }

  deleteProyecto(id: number) {
    if (this._authService.getTipo() == TIPOS.ADMIN) return;

    if (confirm("¿Está seguro de que desea eliminar el proyecto? Todos los datos relacionados también se eliminarán.")) {
      const request = {
        accessToken: this._authService.getAccessToken(),
        id: id
      };

      this._deleteResource.deleteProyecto(request).subscribe((res: StandardResponse) => {
        if (res.status == 0) {
          this.fin = true;
          this.getProyectos();
        } else {
          this.error = true;
        }
      });
    }
  }

  addProyecto() {
    this._router.navigateByUrl("/proyectos/nuevo");
  }

  public get tipos(): typeof TIPOS {
    return TIPOS;
  }

  cerrarAlerta() {
    this.fin = false;
    this.error = false;
  }

}
