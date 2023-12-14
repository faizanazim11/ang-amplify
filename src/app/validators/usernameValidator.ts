import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { CognitoService } from "../services/cognito.service";

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  constructor(private cognitoService: CognitoService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return this.cognitoService.usernameExists(control.value).then((usernameExists) => {
      return usernameExists ? { usernameExists: true } : null;
    }).catch((error) => {
      console.log('error checking username:', error);
      return null;
    });
  }
}
