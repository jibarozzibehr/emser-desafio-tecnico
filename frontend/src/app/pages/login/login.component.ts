import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) { }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    if (this._authService.getAccessToken()) {
      this._router.navigateByUrl("/");
    }
  }

  signIn() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this._authService.login({username: credentials.username, password: credentials.password});
    } else {
      this.error = true;
    }
  }

  cerrarAlerta() {
    this.error = false;
  }

}
