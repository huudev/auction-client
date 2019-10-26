import { TestBed } from '@angular/core/testing';

import { AuthUSERAGuardService } from './auth-usera-guard.service';

describe('AuthUSERAGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthUSERAGuardService = TestBed.get(AuthUSERAGuardService);
    expect(service).toBeTruthy();
  });
});
