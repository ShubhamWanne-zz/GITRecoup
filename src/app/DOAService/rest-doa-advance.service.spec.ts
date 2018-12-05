import { TestBed } from '@angular/core/testing';

import { RestDoaAdvanceService } from './rest-doa-advance.service';

describe('RestDoaAdvanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestDoaAdvanceService = TestBed.get(RestDoaAdvanceService);
    expect(service).toBeTruthy();
  });
});
