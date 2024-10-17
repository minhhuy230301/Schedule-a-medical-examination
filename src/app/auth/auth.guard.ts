import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../service/user/user-auth.service';
import { UserService } from '../service/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAutherService:UserAuthService, private route:Router,
    private userService:UserService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAutherService.getToken()!== ""){
        const role = route.data['roles'] as Array<string>
        if(role){
           const match = this.userService.roleMatch(role);
           console.log(role+"cccccccccc");
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+match);
           if(match){
             return true;
           }
           else{
            this.route.navigate(['/forbidden']);
            return false;
           }
        }
    }
    this.route.navigate(['/login']);
    return false;
  }

}
