import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProyectosResponse } from 'src/app/api/models/ProyectosResponse';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { EditResourceService } from 'src/app/api/resources/edit-resource.service';
import { GetResourceService } from 'src/app/api/resources/get-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})

export class EditarProyectoComponent implements OnInit {

  private _suscription: Subscription;

  proyectoId: number;
  proyecto: ProyectosResponse;

  nombre: FormControl;

  fin: boolean;
  error: boolean;
  submitted: boolean;

  errorMessage: string;

  constructor(private _fb:FormBuilder, private _dataService: DataService, private _getResouce: GetResourceService, private _editResource: EditResourceService, private _authService: AuthService, private _router: Router) {
    this.fin = false;
    this.error = false;
    this.submitted = false;
    this.errorMessage = "";

    this.nombre = new FormControl();
  }

  ngOnInit(): void {
    if (!this._dataService.getProyectoId()) {
      this._router.navigateByUrl("/proyectos");
    } else {
      this.proyectoId = this._dataService.getProyectoId();

      this.getProyecto();
    }
  }

  editProyecto() {
    const editProyectoRequest = {
      accessToken: this._authService.getAccessToken(),
      id: this.proyecto.project.id,
      nombre: this.nombre.value,
      activo: this.proyecto.project.activo
    }

    this._editResource.editProyecto(editProyectoRequest).subscribe((res: StandardResponse) => {
      this.fin = true;
      this.getProyecto();
    },
    (err) => {
      console.log(err);
    });
  }

  cerrarAlerta() {
    this.fin = false;
    this.error = false;
  }

  private getProyecto() {
    this._getResouce.getProyecto(this._authService.getAccessToken(), this.proyectoId).subscribe((res: ProyectosResponse) => {
      this.proyecto = res;
      
      if (res.status == 0) {
        this.nombre.setValue(this.proyecto.project.nombre);
      }
    });
  }


}
