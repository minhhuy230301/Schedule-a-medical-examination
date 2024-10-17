import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifyDoctorComponent } from './admin-verify-doctor.component';

describe('AdminVerifyDoctorComponent', () => {
  let component: AdminVerifyDoctorComponent;
  let fixture: ComponentFixture<AdminVerifyDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVerifyDoctorComponent]
    });
    fixture = TestBed.createComponent(AdminVerifyDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
