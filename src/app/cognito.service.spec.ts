import { TestBed } from '@angular/core/testing';

import { CognitoService } from './services/cognito.service';

describe('CognitoService', () => {
  let service: CognitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CognitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
