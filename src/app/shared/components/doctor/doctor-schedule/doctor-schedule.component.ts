import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/model/appointment';
import { Schedule } from 'src/app/modelDTO/schedule';
import { AppointmentsService } from 'src/app/service/appointments/appointments.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.css']
})
export class DoctorScheduleComponent implements OnInit {
  formattedDate='';
  schedule:Schedule[]=[]
  selected: Date | null | undefined;
  config : any;
  data:string= '';
  constructor(private userAuthService:UserAuthService,private router: Router,
    private appointmentsService:AppointmentsService,
    private toart:ToastrService){
    // const date ='2023-12-10';
    const current_date = new Date();

    const date = this.addLeadingZero(current_date.getDate());
    const month = this.addLeadingZero(current_date.getMonth()+1);
    const year = current_date.getFullYear();
     this.formattedDate = `${year}-${month}-${date}`
    appointmentsService.getPatients(this.getUsername(),this.formattedDate).subscribe(next=>{
      this.schedule=next;

      console.log(this.schedule);
      console.log(this.schedule[0].patients.name);
      console.log(this.schedule[0].doctor.name);
    })
  }
  ngOnInit(): void {
    if(this.schedule){
      this.data = "true";
    }

    this.loadPage();
  }
  addLeadingZero(number:any) {
    return number < 10 ? '0' + number : number;
  }
  pageChanged(event: number) {
    this.config.currentPage = event;
  }
  loadPage(){

    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.schedule.length
    }
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
  handleCalendarClick(){
     // Lấy ngày, tháng, năm từ đối tượng Date
     if(this.selected){
      const day = this.addLeadingZero(this.selected.getDate());
      const month = this.addLeadingZero(this.selected.getMonth()+1);
      const year = this.selected.getFullYear();
       this.formattedDate = `${year}-${month}-${day}`;

      // neu da chon va save thi se ko cho chon nua
      this.appointmentsService.getPatients(this.getUsername(),this.formattedDate).subscribe(next=>{
          this.schedule = next;
          console.log(this.schedule[0].patients.name);
          console.log(this.schedule[0].doctor.name);
          console.log(next);

      })

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
goToVideoCall(item:Schedule) {
  if(item.isEnable == 2){
    this.toart.error("Không thể thực hiện cuộc gọi vì bệnh nhân này đã bị xóa khỏi hệ thống");
  }

  else if(item.isDeletePatients ==1){
    this.toart.error(" Bệnh nhân đã xóa lịch hẹn!");
  }
  else{
  const queryParams = { schedule: JSON.stringify(item) };
  console.log(queryParams);

  this.router.navigate(['/video'], { queryParams });
  }
}
}
