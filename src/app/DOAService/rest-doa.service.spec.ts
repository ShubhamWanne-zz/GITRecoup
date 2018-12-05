import { TestBed } from '@angular/core/testing';

import { RestDOAService } from './rest-doa.service';

describe('RestDOAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestDOAService = TestBed.get(RestDOAService);
    expect(service).toBeTruthy();
  });
});
