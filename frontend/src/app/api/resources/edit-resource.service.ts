import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProyectoRequest } from '../models/ProyectoRequest';
import { ProyectosResponse } from '../models/ProyectosResponse';
import { UsuarioRequest } from '../models/UsuarioRequest';
import { UsuariosResponse } from '../models/UsuariosResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EditResourceService {
  pathPrefix = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) { }

  editProyecto(request: ProyectoRequest) {
    return this._http.put<ProyectosResponse>(`${this.pathPrefix}/projects/`, request, httpOptions);
  }

  editUsuario(request: UsuarioRequest) {
    return this._http.put<UsuariosResponse>(`${this.pathPrefix}/users/`, request, httpOptions);
  }
}
