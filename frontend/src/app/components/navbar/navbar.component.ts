import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  username: string;

  constructor(private _authService: AuthService, private _router: Router) {
    this.username = this._authService.getUsername();
  }

  logout() {
    this._authService.logout();
  }


}
