
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Patients } from 'src/app/model/patients';
import { PatientService } from 'src/app/service/patient/patient.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-record-profile',
  templateUrl: './record-profile.component.html',
  styleUrls: ['./record-profile.component.css']
})
export class RecordProfileComponent {
  patient:Patients={
    id:0
  };
  dataPatient:FormGroup;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private user: UserService,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private userAuthService:UserAuthService,
 ) {
  this.dataPatient = new FormGroup(
    {
      username: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/),]),
      email: new FormControl('',[Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/),]),
      phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]+$/),]),
      gender: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),]),
      address: new FormControl('',[Validators.required]),
  })

 }

  ngOnInit(): void {
    this.getDataPatient();
  }
  isUpdate: Boolean = false;
  openUpdate() {
    this.isUpdate = !this.isUpdate;
    console.log(this.dataPatient.value);
    this.builDataForm();

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

  getDataPatient(){
    console.log("vao dc");
    this.patientService.getDataPatient(this.getUsername()).subscribe(next=>{
      if(next){


        const datePipe = new DatePipe('en-US');
        const inputDateString = next.date;
        // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
        const inputDate = new Date(inputDateString);
        const formattedDate = datePipe.transform(inputDate, 'yyyy-MM-dd');
        next.date =formattedDate;
        this.patient = next;
        console.log(this.patient)
        console.log(this.patient.username);
        this.patient.username = this.getUsername();

      }else{
        this.patient.username = this.getUsername();
      }
    })


  }

  builDataForm(){
    this.dataPatient.controls['username'].setValue(this.getUsername());
    this.dataPatient.controls['name'].setValue(this.patient.name);
    this.dataPatient.controls['email'].setValue(this.patient.email);
    this.dataPatient.controls['phoneNumber'].setValue(this.patient.phoneNumber);
    this.dataPatient.controls['gender'].setValue(this.patient.gender);
    this.dataPatient.controls['date'].setValue(this.patient.date);
    this.dataPatient.controls['address'].setValue(this.patient.address);

  }
  getDataPatientFromForm(){
    if(this.dataPatient.valid){
    this.patientService.updatePatient(this.dataPatient.getRawValue()).subscribe((res)=>{
      console.log("ok nha");
      this.toastr.success("Lưu thông tin thành công")
      this.isUpdate = !this.isUpdate;
      console.log(res);
      // this.router.navigateByUrl('/user/profile');
      this.ngOnInit();
    })
  }else{
    this.toastr.error("Thông tin không hợp lệ!")
  }
  }
  url: any = '';
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (data: any) => {
        // called once readAsDataURL is completed
        this.url = data.target.result;
        console.log(this.url);
      };
    }
  }
  public delete() {
    this.url = null;
  }
}
