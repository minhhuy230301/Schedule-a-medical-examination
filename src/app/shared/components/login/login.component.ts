import { UserService } from './../../../service/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from './../../../model/user';

import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User={};
  loginForm:FormGroup;
  constructor(private userService:UserService,
    private userAuth:UserAuthService,
    private router:Router
    ){
    this.loginForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      userPassword: new FormControl('',[Validators.required])
    })
  }
  ngOnInit(): void {

  }

  submit(){
    // console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(next =>{
      console.log("tokennnnnnnnnnnnnnn")
      console.log(next.jwtToken);

      console.log(next.role)
      this.userAuth.setRoles(next.role)
      this.userAuth.setToken(next.jwtToken)
      const role = next.role.name;
      console.log("role "+role)
      if(role ==="ROLE_ADMIN"){
        this.router.navigate(['/admin/add_pots'])
      }else{
        this.router.navigate(['/patient'])
      }

    }, erorr =>{
      console.log(erorr);
    } )
  }
}

