import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProyectoRequest } from '../models/ProyectoRequest';
import { StandardResponse } from '../models/StandardResponse';
import { UsuarioRequest } from '../models/UsuarioRequest';

@Injectable({
  providedIn: 'root'
})

export class DeleteResourceService {

  pathPrefix = `${environment.apiUrl}`;

  constructor(private _http: HttpClient) { }

  deleteProyecto(request: ProyectoRequest) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: request
    };

    return this._http.delete<StandardResponse>(`${this.pathPrefix}/projects/`, httpOptions);
  }

  deleteUsuario(request: UsuarioRequest) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: request
    };

    return this._http.delete<StandardResponse>(`${this.pathPrefix}/users/`, httpOptions);
  }

}
