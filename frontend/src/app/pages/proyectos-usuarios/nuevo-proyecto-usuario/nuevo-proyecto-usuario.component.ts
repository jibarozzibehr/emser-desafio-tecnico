import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProyectosResponse } from 'src/app/api/models/ProyectosResponse';
import { ProyectoUsuarioRequest } from 'src/app/api/models/ProyectoUsuarioRequest';
import { StandardResponse } from 'src/app/api/models/StandardResponse';
import { UsuariosResponse } from 'src/app/api/models/UsuariosResponse';
import { AddResourceService } from 'src/app/api/resources/add-resource.service';
import { GetResourceService } from 'src/app/api/resources/get-resource.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TIPOS } from 'src/app/auth/tipos.enum';

@Component({
  selector: 'app-nuevo-proyecto-usuario',
  templateUrl: './nuevo-proyecto-usuario.component.html',
  styleUrls: ['./nuevo-proyecto-usuario.component.css']
})

export class NuevoProyectoUsuarioComponent implements OnInit {

  usuarios: UsuariosResponse
  proyectos: ProyectosResponse;

  fin: boolean;
  error: boolean;
  
  addProyectoUsuarioForm: FormGroup;

  constructor(private _getResource: GetResourceService, private _authResource: AuthService, private _fb: FormBuilder, private _addResource: AddResourceService) {
    this.fin = false;
    this.error = false;
    
    this.addProyectoUsuarioForm = this._fb.group({
      usuario: new FormControl('', Validators.required),
      proyecto: new FormControl('', Validators.required)
    });
  }
  
  ngOnInit(): void {
    this._getResource.getUsuarios(this._authResource.getAccessToken()).subscribe((res: UsuariosResponse) => {
      this.usuarios = res;
    });

    this._getResource.getProyectos(this._authResource.getAccessToken()).subscribe((res: ProyectosResponse) => {
      this.proyectos = res;
    });
  }

  addProyectoUsuario() {
    const proyectoUsuarioRequest: ProyectoUsuarioRequest = {
      accessToken: this._authResource.getAccessToken(),
      usuarioId: this.addProyectoUsuarioForm.controls.usuario.value,
      proyectoId: this.addProyectoUsuarioForm.controls.proyecto.value
    }
    console.log(proyectoUsuarioRequest);

    this._addResource.addProyectoUsuario(proyectoUsuarioRequest).subscribe((res: StandardResponse) => {
      if (res.status == 0) {
        this.fin = true;
      } else {
        this.error = true;
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
