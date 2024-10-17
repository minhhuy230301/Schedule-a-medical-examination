import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Topic } from 'src/app/model/topic';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { PotsService } from 'src/app/service/pots/pots.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  topic:Topic[]=[];
constructor(private categoriesService:CategoriesService,private userAuthService:UserAuthService,
  private router:Router){
  categoriesService.getAllTopic().subscribe(next=>{
    this.topic = next;
    console.log(next);

  })
}
getRoles(){
  const username:any = this.userAuthService.getRoles();
  console.log(username);

  let arr = [];
  arr.push(username)
  if(username != null && username){
    for(let i=0;i<arr.length;i++){
      return  arr[i].name;
  }
}
}
onSelect(i?:number) {
  if(i!==undefined)
  this.router.navigate(['/categories/',i]);
}
}
