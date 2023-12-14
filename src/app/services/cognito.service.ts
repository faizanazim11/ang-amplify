import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify } from 'aws-amplify';
import * as AWS from 'aws-sdk';
import { SignInParameters, SignUpParameters } from '../types/auth';
import { signUp, confirmSignUp, autoSignIn, signIn, signOut, getCurrentUser} from 'aws-amplify/auth';

import { environment } from '../../environments/environment';
import { EchoToasterService } from './echo-toaster.service';
import { DefaultResponse } from '../models/default-response';

AWS.config.update(
  {
    accessKeyId: environment.sdk.accessKey,
    secretAccessKey: environment.sdk.accessSecret,
    region: environment.cognito.region,
  }
)

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  private cognitoIdServiceProvider: AWS.CognitoIdentityServiceProvider;

  constructor(private echoToasterService: EchoToasterService) {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: environment.cognito.userPoolId,
          userPoolClientId: environment.cognito.userPoolWebClientId,
          signUpVerificationMethod: 'link',
          loginWith: {
            email: true,
            phone: true,
            username: true,
          }
        },
      },
    });
    this.cognitoIdServiceProvider = new AWS.CognitoIdentityServiceProvider();

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public async handleSignUp(signUpParameters: SignUpParameters) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: signUpParameters.username,
        password: signUpParameters.password,
        options: {
          userAttributes: {
            email: signUpParameters.email,
            given_name: signUpParameters.firstName,
            family_name: signUpParameters.lastName,
          },
          autoSignIn: true,
        },
      });
    }
    catch (error) {
      console.log('error signing up:', error);
    }
  }

  public async emailExists(email: string): Promise<boolean> {
    try {
      const { Users } = await this.cognitoIdServiceProvider.listUsers({
        UserPoolId: environment.cognito.userPoolId,
        Filter: `email = "${email}"`,
      }).promise();
      return !!Users?.length;
    }
    catch (error) {
      console.log('error checking email:', error);
      return false;
    }
  }

  public async usernameExists(username: string): Promise<boolean> {
    try {
      const { Users } = await this.cognitoIdServiceProvider.listUsers({
        UserPoolId: environment.cognito.userPoolId,
        Filter: `username = "${username}"`,
      }).promise();
      return !!Users?.length;
    }
    catch (error) {
      console.log('error checking email:', error);
      return false;
    }
  }

  public async handleLogin(signInParameters: SignInParameters) {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: signInParameters.username,
        password: signInParameters.password,
      });
      if (isSignedIn) {
        this.authenticationSubject.next(true);
        return "success";
      }
      else {
        if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          this.echoToasterService.show({ message: 'Please confirm your account before signing in. Try Checking your email for verification link.', status: 'warning' } as DefaultResponse);
          return "confirmSignUp";
        }
        return "failed";
      }
    }
    catch (error) {
      console.log('error signing in:', error);
      return "failed";
    }
  }

  public async handleLogout() {
    try {
      await signOut();
      this.authenticationSubject.next(false);
    }
    catch (error) {
      console.log('error signing out:', error);
    }
  }
}
