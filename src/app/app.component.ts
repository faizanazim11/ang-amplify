import { SignUpParameters } from './types/auth';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CognitoService } from './services/cognito.service';
import { EmailValidator } from './validators/emailValidator';
import { UsernameValidator } from './validators/usernameValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    lastName: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
    email: new FormControl('', { validators: Validators.required, updateOn: 'blur', asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)] }),
    username: new FormControl('', { validators: Validators.required, updateOn: 'blur', asyncValidators: [this.usernameValidator.validate.bind(this.usernameValidator)] }),
    password: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
  });

  constructor(private cognitoService: CognitoService, private emailValidator: EmailValidator, private usernameValidator: UsernameValidator) {
  }

  register() {
    this.cognitoService.handleSignUp(this.registrationForm.value as SignUpParameters);
  }

  get email(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('email');
  }

  get username(): AbstractControl<string | null, string | null> | null {
    return this.registrationForm.get('username');
  }
}
