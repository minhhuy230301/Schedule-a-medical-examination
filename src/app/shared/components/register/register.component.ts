import { ErrorComponent } from './../../common/error/error.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user/user.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  url = 'localhost:8080/registerNewUser';
  showPassword=false;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private user: UserService,
    private formBuilder: FormBuilder
  ) {}

  infoUser = this.formBuilder.group({
    username: ['', [Validators.required ,
    Validators.minLength(5),
    Validators.pattern(/^[a-zA-Z0-9]+$/),]],  // không chứa khoảng trắng
    password: ['', [Validators.required, Validators.minLength(8),
    Validators.pattern(/^(?=.*[!@#$%^&*])/)]], // ít nhất 1 kí tự đặc biệt
    confirmPassword: ['', [Validators.required]],
  });

  get validateForm() {
    return this.infoUser.controls;
  }
  get checkPass() {
    if (this.infoUser.value.confirmPassword !== this.infoUser.value.password) {
      this.infoUser.invalid;
      return 'Mật khẩu không khớp';
    } else {
      return;
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}
  agree(){

  }
  getUserFromData() {
    if (this.infoUser.value.confirmPassword !== this.infoUser.value.password) {
      this.toastr.error("Không trùng mật khẩu!");
    }
    else{
        if (this.infoUser.invalid) {
      this.toastr.error('Vui lòng kiểm tra lại thông tin');
        } else {
         let dataUser = {
          username: this.infoUser.value.username,
         password: this.infoUser.value.password,
        };
        this.user.register(dataUser).subscribe(
          (next) => {
            if(next == false){
              this.toastr.error("Đã trùng tên đăng nhập. Hãy nhập lại tên khác.")
            }
            else{
              this.router.navigate(['/login']);
              this.toastr.success('Đăng kí thành công');
            }
            console.log(next);


           },
          (err) => {
          console.log(err);
        }
      );
    }
  }
  }
}
