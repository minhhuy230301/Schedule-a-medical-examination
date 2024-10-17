import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestvideocallComponent } from './testvideocall.component';

describe('TestvideocallComponent', () => {
  let component: TestvideocallComponent;
  let fixture: ComponentFixture<TestvideocallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestvideocallComponent]
    });
    fixture = TestBed.createComponent(TestvideocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
