
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8080/public';
  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });

  constructor(private httpClient: HttpClient,private userAuthService:UserAuthService) {}

  register(loginData: any): Observable<any> {
    return this.httpClient.post(
      this.PATH_OF_API + '/registerNewUser',
      loginData,
      { headers: this.requestHeader }
    );
  }
  login(loginData: any): Observable<any> {
    return this.httpClient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
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
      console.log(userRoles.length);
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
