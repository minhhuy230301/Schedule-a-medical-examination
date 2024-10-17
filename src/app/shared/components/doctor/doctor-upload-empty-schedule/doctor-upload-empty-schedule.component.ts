import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/model/appointment';
import { Time } from 'src/app/model/time';
import { AppointmentsService } from 'src/app/service/appointments/appointments.service';
import { TimeService } from 'src/app/service/time/time.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-doctor-upload-empty-schedule',
  templateUrl: './doctor-upload-empty-schedule.component.html',
  styleUrls: ['./doctor-upload-empty-schedule.component.css']
})
export class DoctorUploadEmptyScheduleComponent {
  // isSelected :Boolean = false;
  message:string="";
 formattedDate=''
  selected: Date | null | undefined;
  disabledTimes: string[] = [];
  times:Time[]=[];
  selectedTimes: any[] = [];
  appointments:Appointment[]=[];
  constructor(private timseService:TimeService,
    private toarst:ToastrService,
    private userAuthService:UserAuthService,
    private appointmentsService:AppointmentsService){
    this.timseService.getAllTime().subscribe(next=>{
      this.times = next;
      console.log(next);
    })

  }
  // get Username
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
  isSelectedChoose(time: any): boolean {
    return this.selectedTimes.some(selectedTime => selectedTime.hour === time.hour);
  }

  activeButton(time:any){
    const index = this.selectedTimes.findIndex(selectedTime => selectedTime.hour === time.hour);

    if (index !== -1) {
      // Nếu đã tồn tại, loại bỏ khỏi mảng
      this.selectedTimes.splice(index, 1);
    } else {
      // Nếu chưa tồn tại, thêm vào mảng
      this.selectedTimes.push(time);
    }
    console.log(this.selectedTimes);

  }
  // isTimeSelected(time: Time): boolean {
  //   return this.appointments.some(appointment => appointment.time === time.hour);
  // }
  // nếu có trong disabledTimes thì sẽ trả về true và ẩn đi
  isTimeDisabled(time: any): boolean {

    return this.disabledTimes.includes(time.hour);
  }
  // lấy ra ngày tháng năm của calender
  handleCalendarClick(){
    this.selectedTimes=[]
     // Lấy ngày, tháng, năm từ đối tượng Date
     if(this.selected){
      function addLeadingZero(number:any) {
        return number < 10 ? '0' + number : number;
      }
      const day = addLeadingZero(this.selected.getDate());
      const month = addLeadingZero(this.selected.getMonth() + 1); // Tháng bắt đầu từ 0, nên cộng thêm 1
      const year = this.selected.getFullYear();
      // Định dạng thành chuỗi 'dd-MM-yyyy' hoặc định dạng khác nếu bạn muốn
      this.formattedDate = `${year}-${month}-${day}`;
      // neu da chon va save thi se ko cho chon nua
      this.appointmentsService.checkTime(this.formattedDate,this.getUsername()).subscribe(next=>{
          this.appointments = next;
          console.log(next);
          this.disabledTimes = this.appointments.map(appointment => appointment.time);
          console.log(this.disabledTimes);

      })
      // lay ngay hien tai
      const now = new Date();
      console.log("now+"+now.getDate());

      if(now.getDate()>= day){
        this.message ="Ngày được chọn phải lớn hơn ngày hiện tại!"
      }
      else{
        this.message ="";

     // Hiển thị hoặc sử dụng giá trị formattedDate theo nhu cầu của bạn
     console.log(this.formattedDate);
    }
  }
}

  //chọn tất cả
  chooseAll(){
    this.selectedTimes = [];
    for(let i=0; i<this.times.length; i++){
      this.selectedTimes.push(this.times[i]);
      this.isSelectedChoose(this.times[i]);
    }
    console.log(this.selectedTimes);
  }

  //xóa tất cả
  deleteAll(){
    this.selectedTimes = [];
    for(let i=0; i<this.times.length; i++){
      this.isSelectedChoose(this.times[i])==false;
    }
    console.log(this.selectedTimes);
  }

  //tải dữ liệu lên
  upload(){
    if(this.selected && this.message==""){

      if(this.selectedTimes.length>0){

        for(let i=0; i<this.selectedTimes.length; i++){
         const appointment:Appointment = {
          date:this.formattedDate,
          time:this.selectedTimes[i].hour,
          username:this.getUsername()
         }
         this.disabledTimes.push(appointment.time);
         this.appointmentsService.addAppointments(appointment).subscribe(next=>{
            console.log(next);
            this.toarst.success("Lịch hẹn đã được thêm thành công!");

         });
        }
        this.selectedTimes=[];
      }
      else{
        this.toarst.error("Bạn cần chọn ít nhất 1 giờ!");
      }
  }
  else{
    this.toarst.error("Ngày bạn chọn phải lớn hơn ngày hiện tại!");
  }
}
}
