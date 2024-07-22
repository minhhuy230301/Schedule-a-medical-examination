import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from 'src/app/model/user';
import { Topic } from 'src/app/model/topic';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;
PATH_OF_API ="http://localhost:8080";
   requestHeader = new HttpHeaders(
    {
      "No-Auth":"True"
    }
   );
  constructor(private httpClient:HttpClient,
    private userAuthService:UserAuthService) {
      // this.httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.userAuthService.getToken()}`,
      //     'Access-Control-Allow-Origin': 'http://localhost:4200',
      //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS'
      //   }),
      // };

     }

    register(data:User):Observable<any>{
      return this.httpClient.post(this.PATH_OF_API+"/public/registerNewUser",data)
    }

   login(loginData:any):Observable<any>{
    return this.httpClient.post(this.PATH_OF_API+"/public/authenticate",loginData,{
      headers: this.requestHeader,
    })
  }
  forUser(){
    return this.httpClient.get(this.PATH_OF_API + '/user/forUser');
  }

  forAdmin(){
    return this.httpClient.get(this.PATH_OF_API + '/admin/forAdmin');
  }


  roleMatch(allwowedRoles:any):boolean{
    let isMAtch = false;
    const userRoles:any = this.userAuthService.getRoles();
    let arr = [];
    arr.push(userRoles)
    if(userRoles != null && userRoles){
      console.log("xxxxxxxxxxxxxxxx")
      // loi xay ra o day
      // userRoles bi underfined
      for(let i=0;i<arr.length;i++){
        console.log("pppppppppppp");
          for(let j=0; j<allwowedRoles.length;j++){
            console.log("nnnnnnnnnnnnn");
            console.log(arr[i].name +"ddddddddddddddd")
                if(arr[i].name === allwowedRoles[j]){
                  isMAtch = true;
                  return isMAtch;
                }
                // }else{
                //   return isMAtch;
                // }
          }
            }
               }
               return isMAtch;
    }
}
