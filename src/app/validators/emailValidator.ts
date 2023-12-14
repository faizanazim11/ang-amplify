import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { CognitoService } from "../services/cognito.service";

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  constructor(private cognitoService: CognitoService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this.cognitoService.emailExists(control.value).then((emailExists) => {
      return emailExists ? { emailExists: true } : null;
    }).catch((error) => {
      console.log('error checking email:', error);
      return null;
    });
  }
}
