import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProyectoRequest } from '../models/ProyectoRequest';
import { ProyectoUsuarioRequest } from '../models/ProyectoUsuarioRequest';
import { StandardResponse } from '../models/StandardResponse';
import { UsuarioRequest } from '../models/UsuarioRequest';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AddResourceService {
  
  pathPrefix = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) { }

  addProyecto(request: ProyectoRequest) {
    return this._http.post<StandardResponse>(`${this.pathPrefix}/projects/`, request, httpOptions);
  }

  addUsuario(request: UsuarioRequest) {
    return this._http.post<StandardResponse>(`${this.pathPrefix}/users/`, request, httpOptions);
  }

  addProyectoUsuario(request: ProyectoUsuarioRequest) {
    return this._http.post<StandardResponse>(`${this.pathPrefix}/projects-users/`, request, httpOptions);
  }
}
