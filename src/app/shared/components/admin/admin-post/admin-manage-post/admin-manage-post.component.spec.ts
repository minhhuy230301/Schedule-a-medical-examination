import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagePostComponent } from './admin-manage-post.component';

describe('AdminManagePostComponent', () => {
  let component: AdminManagePostComponent;
  let fixture: ComponentFixture<AdminManagePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManagePostComponent]
    });
    fixture = TestBed.createComponent(AdminManagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
