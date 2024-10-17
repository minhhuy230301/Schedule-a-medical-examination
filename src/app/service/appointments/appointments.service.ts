import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';
import { Doctor } from 'src/app/model/doctor';
import { Specialist } from 'src/app/model/specialist';
import { Schedule } from 'src/app/modelDTO/schedule';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  PATH_OF_API ="http://localhost:8080/doctor";
  constructor(private http:HttpClient) { }

  addAppointments(appointments:any):Observable<Appointment>{
    return this.http.post<Appointment>(this.PATH_OF_API+"/updateSchedule",appointments);
  }
  getAllSpecialist():Observable<Specialist[]>{
    return this.http.get<Specialist[]>(this.PATH_OF_API+"/getAllSpecialist");
  }
  checkTime(date:string,username:string):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.PATH_OF_API}/checkTime?date=${date}&username=${username}`);
  }
  getPatients(username:string,date:String):Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.PATH_OF_API}/getPatients?username=${username}&date=${date}`)
  }
  getDataDoctor(username:string):Observable<any>{
    return this.http.get<Doctor[]>(`${this.PATH_OF_API}/getDataDoctor?username=${username}`)
  }
  updateDoctor(data:Doctor):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/updateDoctor",data)
  }
}
