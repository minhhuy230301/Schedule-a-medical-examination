import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiseaseDto } from 'src/app/modelDTO/disease-dto';

@Injectable({
  providedIn: 'root'
})
export class GetApiWikipediaService {
  PATH_OF_API ="http://localhost:8080/public";
  constructor(private httpClient: HttpClient) { }
  getPageContent():Observable<any>{
    return this.httpClient.get<DiseaseDto[]>(this.PATH_OF_API);
  }
  getPageContentByTitle(title:string):Observable<any>{
    return this.httpClient.get<DiseaseDto>(`${this.PATH_OF_API}/getCotent?title=${title}`);
  }
}
