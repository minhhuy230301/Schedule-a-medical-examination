import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { catchError, map, of } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';
import { BookingService } from 'src/app/service/booking/booking.service';
import { PatientService } from 'src/app/service/patient/patient.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import { UserService } from 'src/app/service/user/user.service';



@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],

})
export class DoctorDetailsComponent {
  appointments:Appointment[]=[];
  checkChoose:Appointment[]=[];
  selectedTimes: any[] = [];
  isSelected :Boolean = false;
  disabledTimes: string[] = [];
  selectedDate:Date| null | undefined;
  idDocter=0;
  formattedDate='';
  checkData=true;
  current_date:Date| null | undefined;
  label="";
  flg=false;
  constructor(private el: ElementRef,
    private patientService:PatientService,
    private bookingService:BookingService,
    private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute,
    private toarst:ToastrService,
    private router:Router){
      this.flg =true
      this.activatedRoute.paramMap.subscribe(next=>{
        const id = next.get('id');
        if(id!=null){

           this.idDocter = parseInt(id);
          console.log(this.idDocter);

           this.current_date = new Date();

          const date = this.addLeadingZero(this.current_date.getDate()+1);
          const month = this.addLeadingZero(this.current_date.getMonth()+1);
          const year = this.current_date.getFullYear();
          this.formattedDate = `${year}-${month}-${date}`
          this.current_date.setDate(this.current_date.getDate()+1);
          this.selectedDate = this.current_date;
          console.log(this.formattedDate);
          console.log("????");

          this.bookingService.getAppointments(this.idDocter,this.formattedDate).subscribe(next=>{
              this.appointments =next
              console.log(this.appointments);
            // nếu không có dữ liệu sẽ ẩn thông tin(Buổi sáng,chiều,tối) và in ra thông báo
      this.checkNull();
          },erorr=>{

          })
          this.bookingService.checkChoose(this.idDocter,this.formattedDate).subscribe(next=>{
            this.checkChoose = next;
            this.disabledTimes = this.checkChoose.map(check =>check.time)


          })
        }
      })
  }
  // kiem tra neu vuot thoi gian trong ngay
  checktime(time:any){

  }
  checkNull(){
    if(this.appointments.length>0){
      this.label="";
      this.checkData = true;
    }
    else{
      this.label="Ngày hiện tại không có lịch, vui lòng chọn ngày tiếp theo";
      this.checkData = false;

    }
  }
  // them so 0 vao nhung Date co ngay <10(khong them se bi loi format)
   addLeadingZero(number:any) {
    return number < 10 ? '0' + number : number;
  }
  // choose date
  changeDate(event:any){
    this.selectedTimes = [];
    this.selectedDate = event.value;


    console.log("vao dc ham change");

    if(this.selectedDate){

      const day = this.addLeadingZero(this.selectedDate.getDate());
      const month = this.addLeadingZero(this.selectedDate.getMonth()+1);
      const year = this.selectedDate.getFullYear();
      if(day>= this.addLeadingZero((this.current_date ?? new Date()).getDate())){
        this.flg = true
       this.formattedDate = `${year}-${month}-${day}`;
       this.bookingService.getAppointments(this.idDocter,this.formattedDate).subscribe(next=>{
        console.log("begin");
          this.appointments =next
          this.checkNull();
      },erorr=>{

      })
       this.bookingService.checkChoose(this.idDocter,this.formattedDate).subscribe(next=>{
        this.checkChoose = next;
        this.disabledTimes = this.checkChoose.map(check =>check.time)


      })
      console.log(`${year}-${month}-${day}`);
    }else{
      this.flg = false;
      this.toarst.error("Ngày chọn phải lớn hơn ngày hiện tại ít nhất 1 ngày")
    }

    }
  }

  isSelectedChoose(times: any): boolean {
    return this.selectedTimes.some(selectedTime => selectedTime.time === times.time);
  }

  activeButton(times:any){
    const index = this.selectedTimes.findIndex(selectedTime => selectedTime.time === times.time);

    if (index !== -1) {
      // Nếu đã tồn tại, loại bỏ khỏi mảng
      this.selectedTimes.splice(index, 1);
    } else {
      // Nếu chưa tồn tại, thêm vào mảng
      this.selectedTimes.push(times);
    }
    console.log(this.selectedTimes);

  }
  isTimeDisableds(times: any): boolean {
  return this.disabledTimes.includes(times.time);
  }
  getUsername(){
    const username:any = this.userAuthService.getAccount();
    if (username != null && username.hasOwnProperty('username')) {
      return username.username;
    }
    return null;
  }
  isMorning(time: string): boolean {
    const startTime = parseInt(time.split(':')[0]);
    return startTime >= 7 && startTime < 12;
  }
  isAfternoon(time: string): boolean {
    const startTime = parseInt(time.split(':')[0]);
    return startTime >= 13 && startTime < 16;
  }
  isEvening(time: string): boolean {
    const startTime = parseInt(time.split(':')[0]);
    return startTime >= 16 && startTime < 23;
  }

  Booking(){
    console.log("jjjjjjjj");
    if(this.getUsername()){
      console.log(this.getUsername());
      console.log("sao lai vay dc");
      this.patientService.getDataPatient(this.getUsername()).subscribe(next=>{
        if(next){
          console.log(next);
          if(this.flg && this.selectedTimes.length>0){
          console.log("kho hieu");
          for(let i=0; i<this.selectedTimes.length; i++){
             const appointment:Appointment = {
              id:this.idDocter,
              date:this.formattedDate,
              time:this.selectedTimes[i].time,
               username:this.getUsername()
         }
         console.log(appointment);

         this.disabledTimes.push(appointment.time)
         this.patientService.booking(appointment).subscribe(next=>{
        console.log("kkkkkkkkkk");
        this.toarst.success("Đặt lịch hẹn thành công!");
        this.router.navigateByUrl('/user/booking');
        console.log(next);

       })
    }
    this.selectedTimes=[];
  } else{
    this.toarst.error("Cần chọn đúng ngày và giờ")
  }
        }else{
          this.toarst.success("Cần bổ sung đầy đủ thông tin trước khi đặt lịch");
          this.router.navigate(['/user/profile']);
        }
      })
    }
  else{
    this.router.navigate(['/login']);
  }
}
}
