import { TestBed } from '@angular/core/testing';

import { videogamedbService } from './videogamedbservice.service';

describe('videogamedbserviceService', () => {
  let service: videogamedbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(videogamedbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
