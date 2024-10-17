import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private router: Router, private toastr: ToastrService) {}

  isProfileMenuOpen = false;
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  logout() {
    localStorage.removeItem('login');
    localStorage.clear();
    this.toastr.warning('Bạn đã dăng xuất');
    this.router.navigate(['login']);
  }
}
