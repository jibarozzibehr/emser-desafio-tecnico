import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { UsuarioRequest } from 'src/app/api/models/UsuarioRequest';
import { UsuariosResponse } from 'src/app/api/models/UsuariosResponse';
import { DeleteResourceService } from 'src/app/api/resources/delete-resource.service';
import { EditResourceService } from 'src/app/api/resources/edit-resource.service';
import { GetResourceService } from 'src/app/api/resources/get-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TIPOS } from 'src/app/auth/tipos.enum';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  usuarios: UsuariosResponse;

  fin: boolean;
  error: boolean;

  constructor(public _authService: AuthService, private _getResource: GetResourceService, private _editResource: EditResourceService, private _deleteResource: DeleteResourceService, private _router: Router, private _dataService: DataService) {
    this.fin = false;
    this.error = false;
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this._getResource.getUsuarios(this._authService.getAccessToken()).subscribe((res) => {
      if (res.status == 0) {
        this.usuarios = res;
      }
    });
  }

  toggleActive(id: number) {
    this._getResource.getUsuario(this._authService.getAccessToken(), id).subscribe((res: UsuariosResponse) => {
      const usuarioRequest: UsuarioRequest = {
        accessToken: this._authService.getAccessToken(),
        id: id,
        username: res.user.username,
        password: res.user.password,
        nombre: res.user.nombre,
        apellido: res.user.apellido,
        telefono: res.user.telefono,
        email: res.user.email,
        tipo: res.user.tipo,
        activo: !res.user.activo,
      };

      this._editResource.editUsuario(usuarioRequest).subscribe((res: StandardResponse) => {
        if (res.status == 0) {
          this.fin = true;
          this.getUsuarios();
        } else {
          this.error = true;
        }
      });
    });
  }

  editUsuario(id: number) {
    this._dataService.setUsuarioId(id);
    this._router.navigateByUrl("/usuarios/editar");
  }

  deleteUsuario(id: number) {
    if (this._authService.getTipo() == TIPOS.ADMIN) return;

    if (confirm("¿Está seguro de que desea eliminar el usuario? Todos los datos relacionados también se eliminarán.")) {
      const request = {
        accessToken: this._authService.getAccessToken(),
        id: id
      };

      this._deleteResource.deleteUsuario(request).subscribe((res: StandardResponse) => {
        if (res.status == 0) {
          this.fin = true;
          this.getUsuarios();
        } else {
          this.error = true;
        }
      });
    }
  }

  addUsuario() {
    this._router.navigateByUrl("/usuarios/nuevo");
  }


  public get tipos(): typeof TIPOS {
    return TIPOS;
  }

  cerrarAlerta() {
    this.fin = false;
    this.error = false;
  }

}
