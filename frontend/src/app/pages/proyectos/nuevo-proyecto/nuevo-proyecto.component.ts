import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { AddResourceService } from 'src/app/api/resources/add-resource.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})

export class NuevoProyectoComponent {

  fin: boolean;
  error: boolean;
  submitted: boolean;

  addProyectoForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authResource: AuthService, private _addResource: AddResourceService) {
    this.fin = false;
    this.error = false;
    this.submitted = false;

    this.addProyectoForm = this._fb.group({
      nombre: new FormControl("", Validators.required)
    });
  }

  addProyecto() {
    this.submitted = true;

    
    if (this.addProyectoForm.valid) {
      const proyectoRequest = {
        accessToken: this._authResource.getAccessToken(),
        nombre: this.addProyectoForm.controls.nombre.value
      }

      this._addResource.addProyecto(proyectoRequest).subscribe((res: StandardResponse) => {
        if (res.status == 0) {
          this.fin = true;
        } else {
          this.error = true;
        }
      });
    }
  }


}
