import { Component, OnInit } from '@angular/core';

// services
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private tokenService: Angular2TokenService, router: Router, route: ActivatedRoute) {
    this.tokenService.init(
      {
        apiBase: environment.apiBaseHr,
        apiPath: 'api/v2',

        signInPath: 'auth/sign_in',
        // signInRedirect: null,
        // signInStoredUrlStorageKey: null,

        signOutPath: 'auth/sign_out',
        validateTokenPath: 'auth/validate_token',
        signOutFailedValidate: false,

        registerAccountPath: 'auth/password/new',
        // deleteAccountPath: 'auth',
        // registerAccountCallback: window.location.href,

        updatePasswordPath: 'auth/password',
        resetPasswordPath: 'auth/password/edit',
        // resetPasswordCallback: window.location.href,

        // oAuthBase: window.location.origin,
        // oAuthPaths: {
        //   github: 'auth/github'
        // },
        // oAuthCallbackPath: 'oauth_callback',
        // oAuthWindowType: 'newWindow',
        // oAuthWindowOptions: null,

        // userTypes: null,

        globalOptions: {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      }
    );
  }

  ngOnInit() {

  }

  singInSession() {
    this.tokenService.signIn({
      email: 'nicolas.vargas@hrinteractive.co',
      password: '123456789iHR'
    }).subscribe(res => {console.log(res)}, error => {console.log(error)});
  }

}
