import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRecordBookingHistoryComponent } from './doctor-record-booking-history.component';

describe('DoctorRecordBookingHistoryComponent', () => {
  let component: DoctorRecordBookingHistoryComponent;
  let fixture: ComponentFixture<DoctorRecordBookingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorRecordBookingHistoryComponent]
    });
    fixture = TestBed.createComponent(DoctorRecordBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
