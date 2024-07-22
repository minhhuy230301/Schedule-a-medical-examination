import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotsRoutingModule } from './pots-routing.module';
import { PotsComponent } from './pots/pots.component';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import { ListPostComponent } from './list_posts/list-post/list-post.component';
import { UpdatePostsComponent } from './update_posts/update-posts/update-posts.component';


@NgModule({
  declarations: [
    PotsComponent,
    ListPostComponent,
    UpdatePostsComponent
  ],
  imports: [
    CommonModule,
    PotsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PotsModule { }
