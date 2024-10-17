import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetApiWikipediaService } from './service/wikipedia/get-api-wikipedia.service';
import { ComponentsComponent } from './shared/components/components.component';
import { HeaderComponent } from './shared/common/header/header.component';
import { FooterComponent } from './shared/common/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PatientComponent } from './shared/components/patient/patient.component';
import { DatLichComponent } from './shared/components/dat-lich/dat-lich.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './service/user/user.service';

import { DoctorDetailsComponent } from './shared/components/doctor/doctor-details/doctor-details.component';
import { HomePatientComponent } from './shared/components/patient/home-patient/home-patient.component';
import { PatientRecordComponent } from './shared/components/patient/patient-record/patient-record.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordProfileComponent } from './shared/components/patient/patient-record/record-profile/record-profile.component';
import { RecordHealthComponent } from './shared/components/patient/patient-record/record-health/record-health.component';
import { RecordSavedComponent } from './shared/components/patient/patient-record/record-saved/record-saved.component';
import { RecordBookingHistoryComponent } from './shared/components/patient/patient-record/record-booking-history/record-booking-history.component';
import { CategoriesListComponent } from './shared/components/categories-list/categories-list.component';
import { DoctorHomeComponent } from './shared/components/doctor/doctor-home/doctor-home.component';
import {
  RouterModule,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { ImageSliderModule } from '../../src/public-api';
import { AdminComponent } from './shared/components/admin/admin.component';
import { AdminDashboardComponent } from './shared/components/admin/admin-dashboard/admin-dashboard.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminCreatePostComponent } from './shared/components/admin/admin-post/admin-create-post/admin-create-post.component';
import { AdminManagePostComponent } from './shared/components/admin/admin-post/admin-manage-post/admin-manage-post.component';
import { AdminPostComponent } from './shared/components/admin/admin-post/admin-post.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { ClickOutsideDirective } from './clickOutside.directive';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './shared/common/error/error.component';
import { CategoriesContentComponent } from './shared/components/categories-list/categories-content/categories-content.component';
import { DoctorComponent } from './shared/components/doctor/doctor.component';
import { DoctorRecordComponent } from './shared/components/doctor/doctor-record/doctor-record.component';
import { DoctorScheduleComponent } from './shared/components/doctor/doctor-schedule/doctor-schedule.component';
import { DoctorUploadEmptyScheduleComponent } from './shared/components/doctor/doctor-upload-empty-schedule/doctor-upload-empty-schedule.component';
import { MatCardModule } from '@angular/material/card';
import { AdminUpdatePostComponent } from './shared/components/admin/admin-post/admin-update-post/admin-update-post/admin-update-post.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpecialistComponent } from './shared/components/specialist/specialist/specialist.component';
import { TestvideocallComponent } from './shared/components/testvideocall/testvideocall/testvideocall.component';
import { HeaderDoctorComponent } from './shared/common/header-doctor/header-doctor.component';
import { DoctorRecordProfileComponent } from './shared/components/doctor/doctor-record/doctor-record-profile/doctor-record-profile.component';
import { DoctorRecordBookingHistoryComponent } from './shared/components/doctor/doctor-record/doctor-record-booking-history/doctor-record-booking-history.component';
import { DoctorRecordHealthComponent } from './shared/components/doctor/doctor-record/doctor-record-health/doctor-record-health.component';
import { DoctorRecordSavedComponent } from './shared/components/doctor/doctor-record/doctor-record-saved/doctor-record-saved.component';
import { DiagnosticComponent } from './shared/components/patient/diagnostic/diagnostic/diagnostic.component';
import { AdminVerifyDoctorComponent } from './shared/components/admin/admin-verify-doctor/admin-verify-doctor.component';
import { RecordRegisterAsDoctorComponent } from './shared/components/patient/patient-record/record-register-as-doctor/record-register-as-doctor.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { DatePipe, registerLocaleData } from '@angular/common';
import { PostContentComponent } from './shared/components/categories-list/post-content/post-content.component';
import { DiseaseComponent } from './shared/components/disease/disease/disease.component';
import localeVi from '@angular/common/locales/vi';
import { LOCALE_ID } from '@angular/core';
import { AdminStatitisComponent } from './shared/components/admin/admin-statitis/admin-statitis.component';
registerLocaleData(localeVi);

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    ComponentsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForbiddenComponent,
    DatLichComponent,
    DoctorDetailsComponent,
    HomePatientComponent,
    PatientRecordComponent,
    RecordProfileComponent,
    RecordHealthComponent,
    RecordSavedComponent,
    RecordBookingHistoryComponent,
    CategoriesListComponent,
    PostContentComponent,
    AdminComponent,
    AdminPostComponent,
    AdminDashboardComponent,
    AdminCreatePostComponent,
    AdminUpdatePostComponent,
    AdminManagePostComponent,
    RegisterComponent,
    ClickOutsideDirective,
    ErrorComponent,
    CategoriesContentComponent,
    DoctorComponent,
    DoctorRecordComponent,
    DoctorRecordProfileComponent,
    DoctorRecordBookingHistoryComponent,
    DoctorRecordHealthComponent,
    DoctorRecordSavedComponent,
    DoctorHomeComponent,
    DoctorScheduleComponent,
    DoctorUploadEmptyScheduleComponent,
    SpecialistComponent,
    TestvideocallComponent,
    HeaderDoctorComponent,
    DiagnosticComponent,
    AdminVerifyDoctorComponent,
    RecordRegisterAsDoctorComponent,
    DiseaseComponent,
    AdminStatitisComponent,
    // HomeComponent,
    // ForbiddenComponent,
    // LoginComponent
  ],
  imports: [
    AngularEditorModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgxPayPalModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatCardModule,
    ImageSliderModule,
  ],
  providers: [
    GetApiWikipediaService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
