import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(): boolean | UrlTree {
    const accessToken = this._authService.getAccessToken();

    if (!accessToken) {
      return this._router.parseUrl('/login');
    } else {
      return true;
    }
  }
  
}
