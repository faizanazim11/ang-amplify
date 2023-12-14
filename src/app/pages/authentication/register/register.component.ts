import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { EchoToasterService } from 'src/app/services/echo-toaster.service';
import { Router } from '@angular/router';
import { DefaultResponse } from 'src/app/models/default-response';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { CognitoService } from 'src/app/services/cognito.service';
import { SignUpParameters } from 'src/app/types/auth';
import { EmailValidator } from 'src/app/validators/emailValidator';
import { UsernameValidator } from 'src/app/validators/usernameValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    lastName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    email: new FormControl('', { validators: Validators.required, updateOn: 'blur', asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)] }),
    username: new FormControl('', { validators: Validators.required, updateOn: 'blur', asyncValidators: [this.usernameValidator.validate.bind(this.usernameValidator)] }),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
  });

  constructor(private echoToasterService: EchoToasterService, private cognitoService: CognitoService, private router: Router, private socialAuthService: SocialAuthService, private emailValidator: EmailValidator, private usernameValidator: UsernameValidator) { }

  ngOnInit(): void {
    this.googleLogin();
  }

  googleLogin(): void {
  }


  register() {
    this.cognitoService.handleSignUp(this.registrationForm.value as SignUpParameters);
    const toasterMessage = { status: 'success', message: 'Successfully registered!, Please check your email to verify your account.' } as DefaultResponse;
    this.echoToasterService.show(toasterMessage);
    this.router.navigate(['/authenticate/login']);
  }

  get email(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('email');
  }

  get username(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('username');
  }

}
