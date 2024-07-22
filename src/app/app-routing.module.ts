import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { PatientComponent } from './shared/components/patient/patient.component';
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // {path:'', pathMatch:'full', redirectTo:"home"},
  {path:"home", component:HomeComponent},
  {path:'', pathMatch:'full', redirectTo:"home"},
  {path:"login", component:LoginComponent},
  {path:"patient",component:PatientComponent},
  // {path:"patient",component:PatientComponent,canActivate:[AuthGuard],data:{roles:['ROLE_USER']}},
  {path:"forbidden",component:ForbiddenComponent},
  {path:"admin",canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']},
  loadChildren: () => import('./shared/components/manager_pots/pots.module').then(module => module.PotsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
