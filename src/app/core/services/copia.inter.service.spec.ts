import { TestBed } from '@angular/core/testing';

import { CopiaInterService } from './copia.inter.service';

describe('CopiaInterService', () => {
  let service: CopiaInterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopiaInterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
