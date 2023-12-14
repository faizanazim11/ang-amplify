import { DefaultResponse } from './../../../models/default-response';
import { EchoToasterService } from '../../../services/echo-toaster.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { SignInParameters } from 'src/app/types/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private routeService: Router, private echoToasterService: EchoToasterService, private cognitoService: CognitoService, private socialAuthService: SocialAuthService) {

  }

  ngOnInit(): void {
    this.googleLogin();
  }

  googleLogin(): void {
  }

  login() {
    const signinresponse = this.cognitoService.handleLogin(this.loginForm.value as SignInParameters).then((res) => {
      if (res == 'success') {
        const toasterMessage = { status: 'success', message: 'Successfully logged in!' } as DefaultResponse;
        this.echoToasterService.show(toasterMessage);
        this.routeService.navigate(['/home']);
      }
    }).catch((err) => {
      const toasterMessage = { status: 'danger', message: err.message } as DefaultResponse;
      this.echoToasterService.show(toasterMessage);
    }
    );
  }

}
