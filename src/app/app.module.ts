import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetApiWikipediaService } from './service/wikipedia/get-api-wikipedia.service';
import { ComponentsComponent } from './shared/components/components.component';
import { HeaderComponent } from './shared/common/header/header.component';
import { FooterComponent } from './shared/common/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PatientComponent } from './shared/components/patient/patient.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { ForbiddenComponent } from './shared/components/forbidden/forbidden.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './service/user/user.service';



@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    ComponentsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ForbiddenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [GetApiWikipediaService, AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  UserService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
