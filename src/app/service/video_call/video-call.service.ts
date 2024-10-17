import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/modelDTO/schedule';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) { }

  pushCodeVideoCall(schedule:Schedule):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/doctor/pushCodeVideoCall/",schedule);
  }
  getCodeVideoCall(id:number):Observable<any>{
    return this.http.get(this.PATH_OF_API+"/user/getCodeVideoCall/"+id);
  }

}
