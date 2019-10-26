import { TestBed } from '@angular/core/testing';

import { AuthUSERBGuardService } from './auth-userb-guard.service';

describe('AuthUSERBGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthUSERBGuardService = TestBed.get(AuthUSERBGuardService);
    expect(service).toBeTruthy();
  });
});
