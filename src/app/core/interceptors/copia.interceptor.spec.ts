import { TestBed } from '@angular/core/testing';

import { CopiaInterceptor } from './copia.interceptor';

describe('CopiaInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CopiaInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CopiaInterceptor = TestBed.inject(CopiaInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
