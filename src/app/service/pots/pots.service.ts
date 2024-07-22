import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from 'src/app/model/topic';
import { Pots } from 'src/app/model/pots';

@Injectable({
  providedIn: 'root'
})
export class PotsService {
  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) { }
  getAllTopic():Observable<Topic[]>{
    return this.http.get<Topic[]>(this.PATH_OF_API+'/admin/getAllTopic');
  }

  getAllPost(id:number):Observable<Pots[]>{
    return this.http.get<Pots[]>(this.PATH_OF_API+"/admin/getAllPost/"+id)
  }

  addPots(posts:any):Observable<any>{
    return this.http.post(this.PATH_OF_API+'/admin/add_posts',posts);
  }
  removePost(id:number):Observable<any>{
    return this.http.get(this.PATH_OF_API+"/admin/delete_post/"+id);
  }
  getPostById(id:number):Observable<any>{
    return this.http.get(this.PATH_OF_API+"/admin/getPostById/"+id)
  }
  updatePost(post:Pots):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/admin/updatePost",post);
  }
}
