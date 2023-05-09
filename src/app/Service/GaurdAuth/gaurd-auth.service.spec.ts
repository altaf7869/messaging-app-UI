import { TestBed } from '@angular/core/testing';

import { GaurdAuthService } from './gaurd-auth.service';

describe('GaurdAuthService', () => {
  let service: GaurdAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaurdAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
