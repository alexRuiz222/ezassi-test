import { TestBed } from '@angular/core/testing';

import { AssigneesService } from './assignees.service';

describe('AssigneesService', () => {
  let service: AssigneesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssigneesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
