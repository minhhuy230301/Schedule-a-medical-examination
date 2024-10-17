import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) { }
  getAppointments(id:number,date:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.PATH_OF_API}/public/getAllAppointmentsByDoctorId?id=${id}&date=${date}`);
  }
  checkChoose(id:number,date:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.PATH_OF_API}/public/checkChoose?id=${id}&date=${date}`);
  }
}
