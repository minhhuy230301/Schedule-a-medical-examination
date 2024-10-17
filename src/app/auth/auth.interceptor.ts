import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../service/user/user-auth.service";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private userAuthService:UserAuthService, private router:Router){

  }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


//     if(req.headers.get("No-Auth")==="True "){
//       return next.handle(req.clone());
//     }
//     const token = this.userAuthService.getToken();
//     this.addToken(req,token);
//     return next.handle(req).pipe(
//       catchError(
//         (err:HttpErrorResponse)=>{
//           console.log(err.status);
//           if(err.status === 401){
//               this.router.navigate(['/login'])
//           }else if(err.status === 403){
//             this.router.navigate(['/forbidden']);
//           }
//           return throwError("Some thing is wrong");
//         }
//       )
//     );
//   }
//   private addToken(request:HttpRequest<any>,token:string)
//   {
//       return request.clone({
//         setHeaders:{
//           Authorization: `Bearer ${token}`
//         }
//       });
//   }
// }
intercept(req: HttpRequest<any>, next: HttpHandler) {
  let authReq = req;
  const tokenValue = this.userAuthService.getToken();
  console.log(tokenValue)
  if (tokenValue != null) {
    authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${tokenValue}`,
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      },
    });
  }
  return next.handle(authReq);
}
}

export const httpInterceptorProviders = [
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor  , multi: true }
];
