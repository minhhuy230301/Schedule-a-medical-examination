import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/model/topic';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) {

   }
   getAllTopic():Observable<Topic[]>{
    return this.http.get<Topic[]>(this.PATH_OF_API+'/public/getAllTopic');
  }
}
