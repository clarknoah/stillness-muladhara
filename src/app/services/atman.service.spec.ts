import { TestBed, inject } from '@angular/core/testing';

import { AtmanService } from './atman.service';

describe('AtmanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtmanService]
    });
  });

  it('should be created', inject([AtmanService], (service: AtmanService) => {
    expect(service).toBeTruthy();
  }));
});
