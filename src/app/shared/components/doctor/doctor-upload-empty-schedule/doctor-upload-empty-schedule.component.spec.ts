import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUploadEmptyScheduleComponent } from './doctor-upload-empty-schedule.component';

describe('DoctorUploadEmptyScheduleComponent', () => {
  let component: DoctorUploadEmptyScheduleComponent;
  let fixture: ComponentFixture<DoctorUploadEmptyScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorUploadEmptyScheduleComponent]
    });
    fixture = TestBed.createComponent(DoctorUploadEmptyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
