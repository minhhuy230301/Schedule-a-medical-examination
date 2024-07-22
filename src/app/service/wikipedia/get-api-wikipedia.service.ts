import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApiWikipediaService {

  constructor(private httpClient: HttpClient) { }
  getPageContent(title:String):Observable<any>{

    return this.httpClient.get("https://en.wikipedia.org/w/api.php?action=parse&page=Pet_door&prop=text&formatversion=2&format=json");
  }
}
