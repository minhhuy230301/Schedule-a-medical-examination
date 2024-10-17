import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css'],
})
export class PatientRecordComponent implements OnInit {
  constructor(private route: Router, private toastr: ToastrService,
    private authUser:UserAuthService) {}
  checkLogin: Boolean = false;

  ngOnInit(): void {
    var login = localStorage.getItem('login');
    console.log(login);
    if (login) {
      this.checkLogin = true;
    } else {
      this.checkLogin = false;
    }
  }

  renderLogin() {}

  logout() {
    this.authUser.clear();
    localStorage.removeItem('login');
    this.route.navigate(['login']);
    this.toastr.warning('Bạn đã đăng xuất');
  }
}
