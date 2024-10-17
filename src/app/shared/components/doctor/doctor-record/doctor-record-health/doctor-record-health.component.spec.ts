import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRecordHealthComponent } from './doctor-record-health.component';

describe('DoctorRecordHealthComponent', () => {
  let component: DoctorRecordHealthComponent;
  let fixture: ComponentFixture<DoctorRecordHealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorRecordHealthComponent]
    });
    fixture = TestBed.createComponent(DoctorRecordHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
