import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordProfileComponent } from './record-profile.component';

describe('RecordProfileComponent', () => {
  let component: RecordProfileComponent;
  let fixture: ComponentFixture<RecordProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordProfileComponent]
    });
    fixture = TestBed.createComponent(RecordProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
