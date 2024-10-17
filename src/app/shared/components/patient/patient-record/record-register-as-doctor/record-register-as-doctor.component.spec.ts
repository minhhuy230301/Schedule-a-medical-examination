import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordRegisterAsDoctorComponent } from './record-register-as-doctor.component';

describe('RecordRegisterAsDoctorComponent', () => {
  let component: RecordRegisterAsDoctorComponent;
  let fixture: ComponentFixture<RecordRegisterAsDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordRegisterAsDoctorComponent]
    });
    fixture = TestBed.createComponent(RecordRegisterAsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
