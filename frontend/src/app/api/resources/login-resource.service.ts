import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/auth/models/loginResponse';
import { UserCredentials } from 'src/app/auth/models/userCredentials';
import { environment } from 'src/environments/environment'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginResourceService {

  authUrl = `${environment.apiUrl}/auth/`;

  constructor(private _http: HttpClient) { }

  login(userCredentials: UserCredentials): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(this.authUrl, userCredentials, httpOptions);
  }

  

}
