import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotsComponent } from './pots/pots.component';
import { ListPostComponent } from './list_posts/list-post/list-post.component';

const routes: Routes = [{
  path:'add_pots',component : PotsComponent
},{
  path:'list_posts',component:ListPostComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotsRoutingModule { }
