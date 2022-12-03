import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { UsuarioRequest } from 'src/app/api/models/UsuarioRequest';
import { AddResourceService } from 'src/app/api/resources/add-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TIPOS } from 'src/app/auth/tipos.enum';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent {

  fin: boolean;
  error: boolean;
  submitted: boolean;

  addUserForm: FormGroup;

  constructor(private _authService: AuthService, private _addResource: AddResourceService, private _fb: FormBuilder) {
    this.fin = false;
    this.error = false;
    this.submitted = false;

    this.addUserForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      tipo: new FormControl('', Validators.required)
    });
  }

  addUsuario() {
    console.log("ENtra", this.addUserForm.valid);
    this.submitted = true;

    const addUserRequest: UsuarioRequest = {
      accessToken: this._authService.getAccessToken(),

      username: this.addUserForm.controls.username.value,
      password: this.addUserForm.controls.password.value,
      nombre: this.addUserForm.controls.nombre.value,
      apellido: this.addUserForm.controls.apellido.value,
      telefono: this.addUserForm.controls.telefono.value,
      email: this.addUserForm.controls.email.value,
      tipo: this.addUserForm.controls.tipo.value
    }

    if (this.addUserForm.valid) {
      this._addResource.addUsuario(addUserRequest).subscribe((res: StandardResponse) => {
        console.log(res);

        if (res.status == 0) {
          this.fin = true;
        } else {
          this.error = true;
        }
      })
    }
  }

  public get tipos(): typeof TIPOS {
    return TIPOS;
  }

  cerrarAlerta() {
    this.fin = false;
    this.error = false;
  }
}
