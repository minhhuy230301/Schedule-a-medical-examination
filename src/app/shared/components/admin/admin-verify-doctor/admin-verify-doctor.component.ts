import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/model/doctor';
import { DoctorDTO } from 'src/app/modelDTO/doctor-dto';
import { PotsService } from 'src/app/service/pots/pots.service';

@Component({
  selector: 'app-admin-verify-doctor',
  templateUrl: './admin-verify-doctor.component.html',
  styleUrls: ['./admin-verify-doctor.component.css'],
})
export class AdminVerifyDoctorComponent implements OnInit {
  isModal = false;
  doctor:DoctorDTO[]=[]
  dtor:DoctorDTO[] = [];
  images:any[]=[];
  doctorAccount:FormGroup;
  showModal = false;
  constructor(private postService:PotsService, private toart:ToastrService) {
    this.doctorAccount = new FormGroup(
      {
        to: new FormControl('',[Validators.required]),
        subject: new FormControl('',[Validators.required]),
        username: new FormControl(''),
        password: new FormControl(''),
    })

    this.postService.getPatientsRegisterDoctor().subscribe(next=>{
      console.log(next);
      this.doctor = next;
      console.log(this.doctor);

    })
  }
  ngOnInit(): void {

  }
  // thêm tài khoản doctor
  toggleModal(item:DoctorDTO) {
    if(item){
      this.doctorAccount.controls['to'].setValue(item.email);
    }
    this.showModal = !this.showModal;
  }
  CloseToggleModal(){
    this.showModal = false;
  }
  // mở xem chi tiết người đăng kí làm doctor
  openModal() {
    this.isModal = true;
    console.log('oke');
  }
  closeModal() {
    this.isModal = false;
  }
  // show modal delete
  showModalDelete = false;
  id:number = 0;
  openModalDelete(item:DoctorDTO) {
    this.id = item.id;
    this.showModalDelete = !this.showModalDelete;
  }
  closeModalDelete() {
    this.showModalDelete = false;
  }
  certificate: any[] = [
    {
      src: 'https://cdn.hellobacsi.com/wp-content/uploads/2023/12/tre-bi-roi-loan-tieu-hoa-1.jpg?w=1920&q=75',
      issue: 'Peri Open',
    },
    {
      src: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      issue: 'Ha Noi Open',
    },
    {
      src: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      issue: 'Ha Noi 2 Open',
    },
    {
      src: 'https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-HD-1080P-3D-Download.jpg',
      issue: 'World 8 pool',
    },
  ];
  sendEmail(){
    this.showModal = false;
    this.postService.sendEmail(this.doctorAccount.value).subscribe(response=>{
      this.toart.success("gửi email thành công")
      console.log('Email sent successfully');
    },error =>{
      this.toart.error("gửi email thất bại");
      console.error('Error sending email', error);
    });
  }
  getUser(id:number){
    if(this.doctor){
     this.dtor = this.doctor.filter(selectedTime => selectedTime.id === id);
     this.images[0]= this.dtor[0].certificate
     console.log("hahahaha");

     console.log(this.images[0]);

    }
  }
  // xóa người dùng đăng kí làm bác sĩ
  deleteRegisterDoctor(){
    this.postService.deleteUserRegisterDoctor(this.id).subscribe(response=>{
      this.showModalDelete = false;
      console.log('Delete successfully');
      this.toart.success("Xóa thành công")
    },error =>{
      this.toart.error("Xóa thất bại!")
      console.error('Error delete', error);
    });
  }
}
