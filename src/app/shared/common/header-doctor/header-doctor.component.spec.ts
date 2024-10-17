import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDoctorComponent } from './header-doctor.component';

describe('HeaderDoctorComponent', () => {
  let component: HeaderDoctorComponent;
  let fixture: ComponentFixture<HeaderDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderDoctorComponent]
    });
    fixture = TestBed.createComponent(HeaderDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
