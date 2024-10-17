import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRecordSavedComponent } from './doctor-record-saved.component';

describe('DoctorRecordSavedComponent', () => {
  let component: DoctorRecordSavedComponent;
  let fixture: ComponentFixture<DoctorRecordSavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorRecordSavedComponent]
    });
    fixture = TestBed.createComponent(DoctorRecordSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
