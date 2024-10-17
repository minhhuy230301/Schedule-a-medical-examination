import { DatePipe } from '@angular/common';
import { DoctorDTO } from './../../../../modelDTO/doctor-dto';
import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/model/doctor';
import { Patients } from 'src/app/model/patients';
import { PatientDto } from 'src/app/modelDTO/patient-dto';
import { PotsService } from 'src/app/service/pots/pots.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user/user.service';
import { PatientService } from 'src/app/service/patient/patient.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',

  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  doctor:DoctorDTO[]=[]
  patients:PatientDto[]=[];
  dtor:DoctorDTO[]=[];
  doc:DoctorDTO[]=[];
  patient:PatientDto[]=[];
  pats:PatientDto[]=[];
  format="";
  constructor(private postService:PotsService,
    private userService:PatientService,
    private datePipe: DatePipe,
    private toart:ToastrService){
    this.postService.getAllDoctor().subscribe(next=>{
      this.doctor = next;
      console.log(this.doctor);
      for(let i = 0; i<this.doctor.length; i++){
        this.format=this.formatDate(this.doctor[i].account.createAt)
        this.doctor[i].account.createAt = this.format
        console.log( this.doctor[i].account.createAt);

    }
      this.toggleTable = false;
    })
  }
  formatDate(dateString: string | null): string {
    if (!dateString) {
      return ''; // hoặc giá trị mặc định khác nếu bạn muốn
  }
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'yyyy-MM-dd') || "";
  }
  @Input() dashboard: string = '';
  toggleTable = false;
  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

   isDoctorDTO(item: any): item is DoctorDTO {
    return typeof item === 'object' && 'certificate' in item;
  }
  showModalDetailDoctor=false;
  openModalDoctor(item:DoctorDTO){
    this.doc[0]=item;
      this.showModalDetailDoctor = !this.showModalDetailDoctor;
  }
  deleteModalDoctor(){
    this.showModalDetailDoctor=false;
  }
  showModalDetailPatients=false;
  openModalPatients(item:PatientDto){
    this.patient[0]=item;
      this.showModalDetailPatients = !this.showModalDetailDoctor;
  }
  deleteModalPatients(){
    this.showModalDetailPatients=false;
  }
  showModalDelete = false;
  openModalDelete(item:any) {
    console.log(item);

    if(this.isDoctorDTO(item)){
      console.log("ok");

      this.dtor[0]=item;
    }else{
      this.pats[0]=item;

    }
    console.log( this.dtor[0]+":::"+this.pats[0]);

    this.showModalDelete = !this.showModalDelete;
  }
  deleteAccount(){
    console.log("begin");
    this.showModalDelete = !this.showModalDelete;
    if( this.dtor[0]){
    console.log(this.dtor[0]);
    this.postService.deleteDoctor(this.dtor[0]).subscribe(next=>{
      this.toart.success("Xóa bác sĩ thành công")
    },erorr =>{
      console.error(erorr); // In ra lỗi
      this.toart.error("Xóa bác sĩ thất bại");
    })
  }
  else{
    this.postService.deletePatients(this.pats[0]).subscribe(next=>{
      this.toart.success("Xóa bệnh nhân thành công")
    },erorr =>{
      console.error(erorr); // In ra lỗi
      this.toart.error("Xóa bệnh nhân thất bại");
    })
  }
  }
  closeModalDelete() {
    this.showModalDelete = false;
  }
  clickedOutside(): void {
    this.showModalDelete = false;
    this.showModal = false;
  }
  tableDoctor() {
    this.postService.getAllDoctor().subscribe(next=>{
      this.doctor = next;
      console.log(this.doctor);
      for(let i = 0; i<this.doctor.length; i++){
        this.format=this.formatDate(this.doctor[i].account.createAt)
        this.doctor[i].account.createAt = this.format
        console.log( this.doctor[i].account.createAt);

    }
      this.toggleTable = false;
    })


  }
  tablePatient() {
    this.postService.getAllPatients().subscribe(next=>{
      console.log(next);

      // this.patients = next.map((item:any) => this.mapToPatients(item));
      this.patients = next;
      console.log("gggggg");

      for(let i = 0; i<this.patients.length; i++){
        this.format=this.formatDate(this.patients[i].account.createAt)
        this.patients[i].account.createAt = this.format
    }
      this.toggleTable = true;
    })
  }
  // pageChanged(event: number) {
  //   this.config.currentPage = event;
  // }
  // loadPage(){
  //   if(this.patients){
  //     this.config = {
  //       itemsPerPage: 3,
  //       currentPage: 1,
  //       totalItems: this.patients.length
  //     }
  //   }
  //   else{

  //   }

  // }
  private mapToPatients(data: any): Patients {
    return {
      id: data.id,
      name: data.name,
      date: new Date(data.date),
      gender: data.gender,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      avatar: data.avatar,
      username: data.account.username // Ví dụ: Lấy username từ account
    };
  }
}
