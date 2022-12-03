import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResourceService } from '../api/resources/login-resource.service';
import { LoginResponse } from './models/loginResponse';
import { UserCredentials } from './models/userCredentials';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _loginResource: LoginResourceService, private _router: Router) { }

  login(userCredentials: UserCredentials) {
    this._loginResource.login(userCredentials).subscribe((res: LoginResponse) => {
      if (res.accessToken) {
        localStorage.setItem("accessToken", res.accessToken);

        

        this.redirectToHome();
      } else {
        console.log(res.description);
      }
    });
  }

  logout() {
    localStorage.removeItem("accessToken");
    this._router.navigateByUrl("/login");
  }

  getAccessToken(): string {
    return localStorage.getItem("accessToken");
  }

  getTipo() {
    return jwt_decode(localStorage.getItem("accessToken"))["tipo"];
  }

  getUsername() {
    return jwt_decode(localStorage.getItem("accessToken"))["username"];
  }
  
  private redirectToHome() {
    this._router.navigate(['/']);
  }
}
