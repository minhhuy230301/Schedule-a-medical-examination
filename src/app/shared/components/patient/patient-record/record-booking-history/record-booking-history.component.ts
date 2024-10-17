import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from 'src/app/modelDTO/schedule';
import { AppointmentsService } from 'src/app/service/appointments/appointments.service';
import { PatientService } from 'src/app/service/patient/patient.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-record-booking-history',
  templateUrl: './record-booking-history.component.html',
  styleUrls: ['./record-booking-history.component.css']
})
export class RecordBookingHistoryComponent {
  schedule:Schedule[]=[];
  filteredHisttory:Schedule[]=[];
  filteredSchedule:Schedule[]=[];
  constructor(private patientService:PatientService,private router: Router,
    private userAuthService:UserAuthService,
    private toart:ToastrService){

    patientService.getAppointments(this.getUsername()).subscribe(next=>{
        this.schedule = next;
        const currentDate  = new Date();
        //Lọc các đối tượng trong mảng schedule
      this.filteredSchedule = this.schedule.filter(function(item) {
  if (item.date) {
    var scheduleDate = new Date(item.date);
    var scheduleTime = item.time.split(' - ')[0]; // Lấy thời gian bắt đầu từ chuỗi time

    // So sánh ngày
    if (scheduleDate > currentDate) {
        return true;
    } else if (scheduleDate.getTime() === currentDate.getTime()) {
        // Nếu ngày bằng ngày hiện tại, so sánh thời gian
        var currentTime = new Date();
        var currentTimeString = currentTime.getHours() + ':' + currentTime.getMinutes();

        return scheduleTime > currentTimeString;
    }
  }

    return false;
});

        this.filteredHisttory = this.schedule.filter(item => !this.filteredSchedule.includes(item));
        console.log(this.filteredSchedule);
        console.log(this.filteredHisttory );
        console.log(this.schedule);

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
  // getRoles(){
  //   const username:any = this.userAuthService.getRoles();
  //   console.log(username);

  //   let arr = [];
  //   arr.push(username)
  //   if(username != null && username){
  //     for(let i=0;i<arr.length;i++){
  //       return  arr[i].name;
  //   }
  // }
  // }
  // goToVideoCall(item:Schedule) {
  //   this.router.navigate(['/video/',item]);
  // }
  goToVideoCall(item:Schedule) {
    if(item.doctor.isEnable == 2){
      this.toart.error("Không thể thực hiện cuộc gọi vì bác sĩ này đã bị xóa khỏi hệ thống");
    }

    else if(item.isDeleteDoctors ==1){
      this.toart.error("Bác sĩ đã xóa lịch hẹn, vui lòng đặt lại lịch hẹn khác!");
    }else {
    const queryParams = { schedule: JSON.stringify(item) };
    this.router.navigate(['/video'], { queryParams });
    }
  }
}
