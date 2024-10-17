import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isFlg=false
  constructor(private userService:UserAuthService){
    if(this.getUsername()){
      this.isFlg=true
    }
  }
  // get Username
  getUsername(){
    const username:any = this.userService.getAccount();
    let arr = [];
    arr.push(username)
    if(username != null && username){
      for(let i=0;i<arr.length;i++){
        return  arr[i].username;
    }
  }
  }
}
