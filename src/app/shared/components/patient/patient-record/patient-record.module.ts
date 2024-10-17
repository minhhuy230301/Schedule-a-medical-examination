import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from '../patient.component';
import { RecordBookingHistoryComponent } from './record-booking-history/record-booking-history.component';
import { RecordHealthComponent } from './record-health/record-health.component';
import { RecordProfileComponent } from './record-profile/record-profile.component';
import { RecordSavedComponent } from './record-saved/record-saved.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    // PatientComponent,
    // RecordBookingHistoryComponent,
    // RecordHealthComponent,
    // RecordProfileComponent,
    // RecordSavedComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet
  ]
})
export class PatientRecordModule { }
