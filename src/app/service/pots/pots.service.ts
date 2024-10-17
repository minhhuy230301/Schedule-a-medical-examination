import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topic } from 'src/app/model/topic';
import { Pots } from 'src/app/model/pots';
import { PostDTO } from 'src/app/modelDTO/post-dto';
import { DoctorDTO } from 'src/app/modelDTO/doctor-dto';
import { PatientDto } from 'src/app/modelDTO/patient-dto';
import { PatientsAndDoctorCount } from 'src/app/modelDTO/statistical/patients-and-doctor-count';
import { MonthlyAccountSummary } from 'src/app/modelDTO/statistical/monthly-account-summary';

@Injectable({
  providedIn: 'root'
})
export class PotsService {

  PATH_OF_API ="http://localhost:8080";
  constructor(private http:HttpClient) { }

  // for admin

  getAllTopic():Observable<Topic[]>{
    return this.http.get<Topic[]>(this.PATH_OF_API+'/admin/getAllTopic');
  }

  getAllPost(id:number):Observable<Pots[]>{
    return this.http.get<Pots[]>(this.PATH_OF_API+"/admin/getAllPost/"+id)
  }

  getAllPostByUser(id:number):Observable<Pots[]>{
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
  getAllDoctor():Observable<any>{
    return this.http.get(this.PATH_OF_API+"/admin/getAllDoctor")
  }
  getAllPatients():Observable<any>{
    return this.http.get(this.PATH_OF_API+"/admin/getAllPatients")
  }
  getPatientsRegisterDoctor():Observable<any>{
    return this.http.get(this.PATH_OF_API+"/admin/getPatientsRegisterDoctor")
  }
  //statistical
  totalPatientsAndDoctor():Observable<PatientsAndDoctorCount>{
    return this.http.get(this.PATH_OF_API+"/admin/statistical/totalPatientsAndDoctor")
  }
  monthlyAccountSummary():Observable<MonthlyAccountSummary[]>{
    return this.http.get<MonthlyAccountSummary[]>(this.PATH_OF_API+"/admin/statistical/monthlyAccountSummary")
  }
  updatePost(post:Pots):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/admin/updatePost",post);
  }
  findAllByNameAndTopic(name:string,topic_id:number):Observable<Pots[]>{
      return this.http.get<Pots[]>(`${this.PATH_OF_API}/admin/getAllByNameAndTopic?nameSearch=${name}&topic_id=${topic_id}`);
  }
  sendEmail(data:any):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/admin/sendEmail",data)
  }

  // pk.eyJ1IjoiZGF0YWl0aTI0IiwiYSI6ImNscWY5ZHU3ajB2NjMybW1rb2Nmc2FiNngifQ.OKD_xnEoaN9P0tj_rIuX2A

  deleteUserRegisterDoctor(id:number){
    return this.http.get(this.PATH_OF_API+"/admin/deleteUserRegisterDoctor/"+id)
  }
  deleteDoctor(doctor:DoctorDTO):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/admin/deleteDoctor",doctor)
  }
  //user
  deletePatients(patients:PatientDto):Observable<any>{
    return this.http.post(this.PATH_OF_API+"/admin/deletePatient",patients)
  }
  getAllPostForUser(id:number):Observable<Pots[]>{
    return this.http.get<Pots[]>(this.PATH_OF_API+"/user/getAllPost/"+id)
  }
  getAllTopicForUser():Observable<Topic[]>{
    return this.http.get<Topic[]>(this.PATH_OF_API+'/user/getAllTopic');
  }

}
