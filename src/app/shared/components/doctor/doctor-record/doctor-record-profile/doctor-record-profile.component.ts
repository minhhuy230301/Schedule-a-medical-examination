import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/model/doctor';
import { Specialist } from 'src/app/model/specialist';
import { AppointmentsService } from 'src/app/service/appointments/appointments.service';

import { PatientService } from 'src/app/service/patient/patient.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-doctor-record-profile',
  templateUrl: './doctor-record-profile.component.html',
  styleUrls: ['./doctor-record-profile.component.css'],
})
export class DoctorRecordProfileComponent {
  doctor:Doctor={id:0}
  specialist:Specialist[]=[];
  dataDoctor:FormGroup;
  isUpdate: Boolean = false;
  constructor(  private userAuthService:UserAuthService,
    private appointmentService:AppointmentsService,
    private toastr: ToastrService,){
    this.dataDoctor = new FormGroup(
      {
        username: new FormControl('',[Validators.required]),
        name: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/),]),
        email: new FormControl('',[Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/),]),
        phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/),]),
        gender: new FormControl('',[Validators.required]),
        date: new FormControl('',[Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),]),
        specialist: new FormControl('',[Validators.required]),
        workAddress: new FormControl('a'),
        houseAddress: new FormControl('a'),
        strengths: new FormControl('a'),
        education: new FormControl('a'),
        issue: new FormControl('a'),
        certificate: new FormControl('a'),

    })
  }
  ngOnInit(): void {
    this.getDataDoctor();
  }
  openUpdate() {
    this.isUpdate = !this.isUpdate;
    console.log(this.dataDoctor.value);
    this.appointmentService.getAllSpecialist().subscribe(next=>{
      this.specialist = next;
      console.log(next);
      this.builDataForm();
    })


  }
  getDataDoctor(){
    console.log("vao dc");
    this.appointmentService.getDataDoctor(this.getUsername()).subscribe(next=>{
      if(next){

        const datePipe = new DatePipe('en-US');
        const inputDateString = next.date;
        // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
        if(next.date){
        const inputDate = new Date(inputDateString);
        const formattedDate = datePipe.transform(inputDate, 'yyyy-MM-dd');
        next.date =formattedDate;
        }
        this.doctor = next;
        console.log(this.doctor)
        console.log(this.doctor.username);
        this.doctor.username = this.getUsername();

      }else{
        this.doctor.username = this.getUsername();
      }
    })


  }
  getUsername(){
    const username:any = this.userAuthService.getAccount();
    let arr = [];
    arr.push(username)
    if(username != null && username){
      for(let i=0;i<arr.length;i++){
        return  arr[i].username;
    }
  }
  }
  getDataDoctorFromForm(){
    if(this.dataDoctor.valid){
    this.appointmentService.updateDoctor(this.dataDoctor.getRawValue()).subscribe((res)=>{
      console.log("ok nha");
      this.isUpdate = !this.isUpdate;
      console.log(res);
      // this.router.navigateByUrl('/user/profile');
      this.toastr.success("Update thành công");
      this.ngOnInit();
    })
  }else{
    this.toastr.error("Thông tin không hợp lệ!")
  }
  }

  builDataForm(){
    this.dataDoctor.controls['username'].setValue(this.getUsername());
    this.dataDoctor.controls['name'].setValue(this.doctor.name);
    this.dataDoctor.controls['email'].setValue(this.doctor.email);
    this.dataDoctor.controls['phoneNumber'].setValue(this.doctor.phoneNumber);
    this.dataDoctor.controls['gender'].setValue(this.doctor.gender);
    this.dataDoctor.controls['date'].setValue(this.doctor.date);
  }
}
