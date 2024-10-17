import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-doctor-record',
  templateUrl: './doctor-record.component.html',
  styleUrls: ['./doctor-record.component.css'],
})
export class DoctorRecordComponent implements OnInit {
  constructor(
    private route: Router,
    private toastr: ToastrService,
    private userAuth: UserAuthService
  ) {}
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
  logout() {
    this.userAuth.clear();

    // localStorage.removeItem('login');
    this.route.navigate(['login']);
    this.toastr.warning('Bạn đã đăng xuất');
  }
}
