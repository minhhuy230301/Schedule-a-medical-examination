import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRecordProfileComponent } from './doctor-record-profile/doctor-record-profile.component';
import { DoctorRecordHealthComponent } from './doctor-record-health/doctor-record-health.component';
import { DoctorRecordSavedComponent } from './doctor-record-saved/doctor-record-saved.component';
import { DoctorRecordHistoryBookingComponent } from './doctor-record-history-booking/doctor-record-history-booking.component';
import { DoctorRecordBookingHistoryComponent } from './doctor-record-booking-history/doctor-record-booking-history.component';



@NgModule({
  declarations: [
    DoctorRecordProfileComponent,
    DoctorRecordHealthComponent,
    DoctorRecordSavedComponent,
    DoctorRecordHistoryBookingComponent,
    DoctorRecordBookingHistoryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DoctorRecordModule { }
