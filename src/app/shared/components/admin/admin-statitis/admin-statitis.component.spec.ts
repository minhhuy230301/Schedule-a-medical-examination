import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatitisComponent } from './admin-statitis.component';

describe('AdminStatitisComponent', () => {
  let component: AdminStatitisComponent;
  let fixture: ComponentFixture<AdminStatitisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStatitisComponent]
    });
    fixture = TestBed.createComponent(AdminStatitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
