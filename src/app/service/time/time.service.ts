
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Time } from 'src/app/model/time';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) { }
  getAllTime():Observable<Time[]>{
    return this.http.get<Time[]>(this.PATH_OF_API+"/doctor/getAllTime");
  }
}
