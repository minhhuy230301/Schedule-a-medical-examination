import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  setRoles(roles:[]){
     localStorage.setItem("roles",JSON.stringify(roles));
  }

  getRoles(): []{
    const roleString = localStorage.getItem("roles");
    if(roleString){
      return JSON.parse(roleString);
    }
    return [];
  }
  setAccount(account:[]){
    localStorage.setItem("account",JSON.stringify(account));
 }

 getAccount(): []{
   const accountString = localStorage.getItem("account");
   if(accountString){
     return JSON.parse(accountString);
   }
   return [];
 }
  setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  //??"" giong voi toan tu 3 ngoi( neu ham duoi ma null thi no se tra ve "")
  getToken():string{
     return localStorage.getItem("jwtToken")??"";
  }
  clear(){
    localStorage.clear();
  }
  isLoggedin(){
    return this.getRoles() && this.getToken();
  }
}
