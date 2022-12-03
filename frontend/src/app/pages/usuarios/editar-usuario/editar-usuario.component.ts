import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { UsuarioRequest } from 'src/app/api/models/UsuarioRequest';
import { UsuariosResponse } from 'src/app/api/models/UsuariosResponse';
import { EditResourceService } from 'src/app/api/resources/edit-resource.service';
import { GetResourceService } from 'src/app/api/resources/get-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TIPOS } from 'src/app/auth/tipos.enum';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent implements OnInit {
  editUserForm: FormGroup;

  user: UsuariosResponse;

  usuarioId: number;

  fin: boolean = false;
  error: boolean = false;
  submitted: boolean = false;

  constructor(private _fb: FormBuilder, private _getResourceService: GetResourceService, private _authService: AuthService, private _editResourceService: EditResourceService, private _dataService: DataService, private _router: Router) {
    this.fin = false;
    this.error = false;
    this.submitted = false;
    
    this.editUserForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      tipo: new FormControl('', Validators.required),
      activo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {

    this.usuarioId = this._dataService.getUsuarioId();
    
    if (!this.usuarioId) {
      this._router.navigateByUrl("/usuarios");
    } else {
      this.getUsuario();
    }
  }

  getUsuario() {
    this._getResourceService.getUsuario(this._authService.getAccessToken(), this.usuarioId).subscribe((res: StandardResponse) => {
      if (res.status == 0) {
        this.user = res;

        this.editUserForm.controls.username.setValue(this.user.user.username);
        this.editUserForm.controls.password.setValue(this.user.user.password);
        this.editUserForm.controls.nombre.setValue(this.user.user.nombre);
        this.editUserForm.controls.apellido.setValue(this.user.user.apellido);
        this.editUserForm.controls.telefono.setValue(this.user.user.telefono);
        this.editUserForm.controls.email.setValue(this.user.user.email);
        this.editUserForm.controls.tipo.setValue(this.user.user.tipo);
        this.editUserForm.controls.activo.setValue(this.user.user.activo);
      }
    })
  }

  editUsuario() {
    this.submitted = true;

    const editUserRequest: UsuarioRequest = {
      accessToken: this._authService.getAccessToken(),

      id: this.usuarioId,
      username: this.editUserForm.controls.username.value,
      password: this.editUserForm.controls.password.value,
      nombre: this.editUserForm.controls.nombre.value,
      apellido: this.editUserForm.controls.apellido.value,
      telefono: this.editUserForm.controls.telefono.value,
      email: this.editUserForm.controls.email.value,
      tipo: this.editUserForm.controls.tipo.value,
      activo: this.editUserForm.controls.activo.value
    }

    if (this.editUserForm.valid) {
      this._editResourceService.editUsuario(editUserRequest).subscribe((res: StandardResponse) => {
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
