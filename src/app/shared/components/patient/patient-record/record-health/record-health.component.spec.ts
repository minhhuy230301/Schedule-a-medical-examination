import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordHealthComponent } from './record-health.component';

describe('RecordHealthComponent', () => {
  let component: RecordHealthComponent;
  let fixture: ComponentFixture<RecordHealthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordHealthComponent]
    });
    fixture = TestBed.createComponent(RecordHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
