import { TestBed } from '@angular/core/testing';

import { ArrayService } from '../app/array.service';

describe('ArrayServiceService', () => {
  let service: ArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
