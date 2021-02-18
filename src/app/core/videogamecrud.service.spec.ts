import { TestBed } from '@angular/core/testing';

import { VideogamecrudService } from './videogamecrud.service';

describe('VideogamecrudService', () => {
  let service: VideogamecrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideogamecrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
