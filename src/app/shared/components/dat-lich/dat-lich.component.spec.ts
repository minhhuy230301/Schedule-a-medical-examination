import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatLichComponent } from './dat-lich.component';

describe('DatLichComponent', () => {
  let component: DatLichComponent;
  let fixture: ComponentFixture<DatLichComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatLichComponent]
    });
    fixture = TestBed.createComponent(DatLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
