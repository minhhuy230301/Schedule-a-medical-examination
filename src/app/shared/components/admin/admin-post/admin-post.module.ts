import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPostComponent } from './admin-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AdminCreatePostComponent } from './admin-create-post/admin-create-post.component';
import { AdminManagePostComponent } from './admin-manage-post/admin-manage-post.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminUpdatePostComponent } from './admin-update-post/admin-update-post/admin-update-post.component';



@NgModule({
  declarations: [
    // AdminCreatePostComponent,
    // AdminManagePostComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ]
})
export class AdminPostModule { }
