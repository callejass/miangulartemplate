import { TestBed } from '@angular/core/testing';

import { TablasMaestrasService } from './tablas-maestras.service';

describe('TablasMaestrasService', () => {
  let service: TablasMaestrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablasMaestrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
