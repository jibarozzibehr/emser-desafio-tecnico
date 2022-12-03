import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProyectosResponse } from '../models/ProyectosResponse';
import { ProyectosUsuariosResponse } from '../models/ProyectosUsuariosResponse';
import { UsuariosResponse } from '../models/UsuariosResponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class GetResourceService {

  pathPrefix = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) { }

  getProyectos(accessToken: string) {
    return this._http.get<ProyectosResponse>(`${this.pathPrefix}/projects/?accessToken=${accessToken}`, httpOptions);
  }

  getProyecto(accessToken: string, id: number) {
    return this._http.get<ProyectosResponse>(`${this.pathPrefix}/projects/?accessToken=${accessToken}&id=${id}`, httpOptions);
  }

  getUsuarios(accessToken: string) {
    return this._http.get<UsuariosResponse>(`${this.pathPrefix}/users/?accessToken=${accessToken}`, httpOptions);
  }

  getUsuario(accessToken: string, id: number) {
    return this._http.get<UsuariosResponse>(`${this.pathPrefix}/users/?accessToken=${accessToken}&id=${id}`, httpOptions);
  }

  getProyectosUsuarios(accessToken: string) {
    return this._http.get<ProyectosUsuariosResponse>(`${this.pathPrefix}/projects-users/?accessToken=${accessToken}`, httpOptions);
  }

}
