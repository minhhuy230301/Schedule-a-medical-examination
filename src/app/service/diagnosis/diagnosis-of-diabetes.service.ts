import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisOfDiabetesService {
  private apiUrl = 'http://localhost:5000/process_data';  // Thay đổi URL theo địa chỉ Flask server của bạn

  constructor(private http: HttpClient) { }

  processData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
