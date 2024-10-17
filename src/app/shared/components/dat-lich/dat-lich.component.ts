import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor';
import { PatientService } from 'src/app/service/patient/patient.service';

@Component({
  selector: 'app-dat-lich',
  templateUrl: './dat-lich.component.html',
  styleUrls: ['./dat-lich.component.css']
})
export class DatLichComponent {
  doctor:Doctor[]=[];
  checkNull:Boolean =false;
  message:string="";
  constructor(private activatedRoute:ActivatedRoute,
    private patientService:PatientService,private router:Router){
    this.activatedRoute.paramMap.subscribe(next=>{
      const id = next.get('id');
      if(id!=null){
        const idSpecialist = parseInt(id);
        this.patientService.getDoctorBySpecialistIdNoAuthen(idSpecialist).subscribe(next=>{
            this.doctor = next;
            if(this.doctor.length>0){
                this.checkNull = true;
                this.message='';
            }else{
              this.message="Hiện tại không có bác sĩ nào."
            }

            console.log(next);
            console.log(this.doctor);

        })
      }

      //   this.postService.getPostById(idParse).subscribe(next=>{
      //     this.post = next;
      //     console.log(this.post.id+"null");
      //     if(this.post.image){
      //       this.imageUrl = this.post.image;
      //     }
      //     this.buildForm();
      //     this.postService.getAllTopic().subscribe(next=>{
      //       this.topic = next;
      //     },erorr=>{
      //       console.log("eorr");
      //     })
      //   })
      // }
    })
  }
  nextPage(id:number){
    this.router.navigate(['bacsi',id])
  }
}
