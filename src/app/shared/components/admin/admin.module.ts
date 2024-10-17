import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterOutlet } from '@angular/router';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    // AdminDashboardComponent,
    // AdminPostComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    CKEditorModule,
    FormsModule
  ]
})
export class AdminModule { }
