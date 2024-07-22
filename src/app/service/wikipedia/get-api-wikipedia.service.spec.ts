import { TestBed } from '@angular/core/testing';

import { GetApiWikipediaService } from './get-api-wikipedia.service';

describe('GetApiWikipediaService', () => {
  let service: GetApiWikipediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetApiWikipediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
