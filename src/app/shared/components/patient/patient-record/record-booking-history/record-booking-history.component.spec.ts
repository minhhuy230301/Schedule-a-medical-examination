import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBookingHistoryComponent } from './record-booking-history.component';

describe('RecordBookingHistoryComponent', () => {
  let component: RecordBookingHistoryComponent;
  let fixture: ComponentFixture<RecordBookingHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordBookingHistoryComponent]
    });
    fixture = TestBed.createComponent(RecordBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
