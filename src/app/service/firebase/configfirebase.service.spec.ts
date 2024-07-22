import { TestBed } from '@angular/core/testing';

import { ConfigfirebaseService } from './configfirebase.service';

describe('ConfigfirebaseService', () => {
  let service: ConfigfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
