import { TestBed } from '@angular/core/testing';

import { UsersEndpointService } from './users-endpoint.service';

describe('UsersEndpointService', () => {
  let service: UsersEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
