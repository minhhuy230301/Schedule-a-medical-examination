import { TestBed } from '@angular/core/testing';

import { DiagnosisOfDiabetesService } from './diagnosis-of-diabetes.service';

describe('DiagnosisOfDiabetesService', () => {
  let service: DiagnosisOfDiabetesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosisOfDiabetesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
