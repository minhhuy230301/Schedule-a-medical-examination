import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { DoctorDetailsComponent } from './shared/components/doctor/doctor-details/doctor-details.component';
import { PatientRecordComponent } from './shared/components/patient/patient-record/patient-record.component';
import { RecordProfileComponent } from './shared/components/patient/patient-record/record-profile/record-profile.component';
import { RecordHealthComponent } from './shared/components/patient/patient-record/record-health/record-health.component';
import { RecordBookingHistoryComponent } from './shared/components/patient/patient-record/record-booking-history/record-booking-history.component';
import { RecordSavedComponent } from './shared/components/patient/patient-record/record-saved/record-saved.component';
import { CategoriesListComponent } from './shared/components/categories-list/categories-list.component';
import { DatLichComponent } from './shared/components/dat-lich/dat-lich.component';
import { DoctorHomeComponent } from './shared/components/doctor/doctor-home/doctor-home.component';
import { AdminComponent } from './shared/components/admin/admin.component';
import { AdminDashboardComponent } from './shared/components/admin/admin-dashboard/admin-dashboard.component';
import { AdminPostComponent } from './shared/components/admin/admin-post/admin-post.component';
import { AdminCreatePostComponent } from './shared/components/admin/admin-post/admin-create-post/admin-create-post.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { CategoriesContentComponent } from './shared/components/categories-list/categories-content/categories-content.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: DoctorDetailsComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:"video", component: TestvideocallComponent},
  {path:"diagnostic", component: DiagnosticComponent},
  { path: 'home/diseaseContent/:title', component: DiseaseComponent },
  {
    path: 'user',
    component: PatientRecordComponent,canActivate:[AuthGuard],data:{roles:['ROLE_USER']},
    children: [
      { path: 'profile', component: RecordProfileComponent },
      { path: 'health', component: RecordHealthComponent },
      { path: 'booking', component: RecordBookingHistoryComponent },
      { path: 'saved', component: RecordSavedComponent },
      {
        path:'registerAsDoctor',component:RecordRegisterAsDoctorComponent
      }
    ],
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
  },
  { path: 'categories/:id', component: CategoriesContentComponent },
  { path: 'categories/:categoryId/postContent/:id', component: PostContentComponent },

  { path: 'specialist', component: SpecialistComponent },
  { path: 'listDoctor/:id', component: DatLichComponent },
  { path: 'bacsi/:id', component: DoctorDetailsComponent },

  { path: 'forDoctor', component: DoctorComponent,canActivate:[AuthGuard],data:{roles:['ROLE_DOCTOR'] },
   children:[
    {path:'home', component:DoctorHomeComponent},
    {path:'schedule', component:DoctorScheduleComponent},
    {path:'uploadSchedule', component:DoctorUploadEmptyScheduleComponent},
    {
      path: 'profile',
      component: DoctorRecordComponent,
      children: [
        { path: 'information', component: DoctorRecordProfileComponent },
        { path: 'health', component: DoctorRecordHealthComponent },
        { path: 'saved', component: DoctorRecordSavedComponent },
        { path: 'booking', component: DoctorRecordBookingHistoryComponent },

      ],
    }

  ],
},
  {
    path: 'admin',canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']},
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'post', component: AdminPostComponent },
      { path: 'create-post', component: AdminCreatePostComponent },
      {path:'post/edit_post/:id',component:AdminUpdatePostComponent},
      { path: 'statitis', component: AdminStatitisComponent },
      {
        path:'verify',component:AdminVerifyDoctorComponent
      }
    ],
  },
  {path:"admin",canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']},
  loadChildren: () => import('./shared/components/manager_pots/pots.module').then(module => module.PotsModule)}
]
import { PatientComponent } from './shared/components/patient/patient.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { DoctorComponent } from './shared/components/doctor/doctor.component';
import { DoctorScheduleComponent } from './shared/components/doctor/doctor-schedule/doctor-schedule.component';
import { DoctorUploadEmptyScheduleComponent } from './shared/components/doctor/doctor-upload-empty-schedule/doctor-upload-empty-schedule.component';
import { AdminUpdatePostComponent } from './shared/components/admin/admin-post/admin-update-post/admin-update-post/admin-update-post.component';
import { SpecialistComponent } from './shared/components/specialist/specialist/specialist.component';
import { TestvideocallComponent } from './shared/components/testvideocall/testvideocall/testvideocall.component';
import { PostContentComponent } from './shared/components/categories-list/post-content/post-content.component';
import { DoctorRecordComponent } from './shared/components/doctor/doctor-record/doctor-record.component';
import { DoctorRecordProfileComponent } from './shared/components/doctor/doctor-record/doctor-record-profile/doctor-record-profile.component';
import { DoctorRecordHealthComponent } from './shared/components/doctor/doctor-record/doctor-record-health/doctor-record-health.component';
import { DoctorRecordSavedComponent } from './shared/components/doctor/doctor-record/doctor-record-saved/doctor-record-saved.component';
import { DoctorRecordBookingHistoryComponent } from './shared/components/doctor/doctor-record/doctor-record-booking-history/doctor-record-booking-history.component';
import { DiagnosticComponent } from './shared/components/patient/diagnostic/diagnostic/diagnostic.component';
import { AdminVerifyDoctorComponent } from './shared/components/admin/admin-verify-doctor/admin-verify-doctor.component';
import { RecordRegisterAsDoctorComponent } from './shared/components/patient/patient-record/record-register-as-doctor/record-register-as-doctor.component';
import { DiseaseComponent } from './shared/components/disease/disease/disease.component';
import { AdminStatitisComponent } from './shared/components/admin/admin-statitis/admin-statitis.component';

// const routes: Routes = [
//   // {path:'', pathMatch:'full', redirectTo:"home"},
//   {path:"home", component:HomeComponent},
//   {path:"login", component:LoginComponent},
//   {path:"patient",component:PatientComponent,canActivate:[AuthGuard],data:{roles:['ROLE_USER']}},
//   {path:"forbidden",component:ForbiddenComponent},
//   {path:"admin",canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']},
//   loadChildren: () => import('./shared/components/manager_pots/pots.module').then(module => module.PotsModule)}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
