import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRecordProfileComponent } from './doctor-record-profile.component';

describe('DoctorRecordProfileComponent', () => {
  let component: DoctorRecordProfileComponent;
  let fixture: ComponentFixture<DoctorRecordProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorRecordProfileComponent]
    });
    fixture = TestBed.createComponent(DoctorRecordProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
