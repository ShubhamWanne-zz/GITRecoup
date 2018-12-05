import { TestBed } from '@angular/core/testing';

import { ComponentCommService } from './component-comm.service';

describe('ComponentCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentCommService = TestBed.get(ComponentCommService);
    expect(service).toBeTruthy();
  });
});
