import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';
import { Doctor } from 'src/app/model/doctor';
import { Patients } from 'src/app/model/patients';
import { Specialist } from 'src/app/model/specialist';
import { PatientDto } from 'src/app/modelDTO/patient-dto';
import { PostDTO } from 'src/app/modelDTO/post-dto';
import { Schedule } from 'src/app/modelDTO/schedule';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) { }

  getAllSpecialist():Observable<Specialist[]>{
    return this.http.get<Specialist[]>(this.PATH_OF_API+'/user/getAllSpecialist');
  }
  getAllSpecialistNoAuthen():Observable<Specialist[]>{
    return this.http.get<Specialist[]>(this.PATH_OF_API+'/public/getAllSpecialist');
  }
  getDoctorBySpecialistId(id:number):Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.PATH_OF_API+'/user/getAllDoctorBySpecialistId/'+id)
  }
  getDoctorBySpecialistIdNoAuthen(id:number):Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.PATH_OF_API+'/public/getAllDoctorBySpecialistId/'+id)
  }
  booking(appointment:any):Observable<Appointment>{
    return this.http.post<Appointment>(this.PATH_OF_API+"/user/booking",appointment)
  }
  getAllPostById(id:number):Observable<PostDTO[]>{
    return this.http.get<PostDTO[]>(this.PATH_OF_API+"/user/getAllPost/"+id)
  }
  // khong dang nhap
  getAllPostId(id:number):Observable<PostDTO[]>{
    return this.http.get<PostDTO[]>(this.PATH_OF_API+"/public/getAllPost/"+id)
  }
  getAppointments(username:string):Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.PATH_OF_API}/user/getPatients?usernamePatients=${username}`)
  }
  getPostByIdPost(id:number):Observable<any>{
    return this.http.get(this.PATH_OF_API+"/user/getPostByIdPost/"+id)
  }
  //khong dang nhap
  getPostById(id:number):Observable<any>{
    return this.http.get(this.PATH_OF_API+"/public/getPostByIdPost/"+id)
  }
  getDataPatient(username:string):Observable<any>{
    return this.http.get<Patients[]>(`${this.PATH_OF_API}/user/getPatient?username=${username}`)
  }
  updatePatient(data:Patients):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/user/updatePatient", data)
  }
  registerDoctor(data:Doctor):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/user/registerDoctor", data)
  }

}
