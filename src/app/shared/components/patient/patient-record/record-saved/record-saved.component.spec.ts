import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordSavedComponent } from './record-saved.component';

describe('RecordSavedComponent', () => {
  let component: RecordSavedComponent;
  let fixture: ComponentFixture<RecordSavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordSavedComponent]
    });
    fixture = TestBed.createComponent(RecordSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
