import { TestBed } from '@angular/core/testing';

import { MiAuthService } from './mi-auth.service';

describe('MiAuthService', () => {
  let service: MiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
