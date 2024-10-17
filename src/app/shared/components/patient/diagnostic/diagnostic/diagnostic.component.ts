import { DiagnosisOfDiabetesService } from './../../../../../service/diagnosis/diagnosis-of-diabetes.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent {
  form: FormGroup;
  mesage="" ;
  isModal = false;
  constructor( private diagnosisService:DiagnosisOfDiabetesService,private toarst:ToastrService,
    private dialog: MatDialog,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      value1: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value2: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value3: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value4: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value5: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value6: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value7: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]],
      value8: ['', [Validators.required, Validators.pattern(/^(?:[0-9]|[1-9]\d*|\d*\.\d+)$/)]]
    });
  }
  closeModal() {
    this.isModal = false;
  }
  processData() {
    const formData = this.form.value;
    if(this.form.invalid){
      this.toarst.error("Kiểm tra lại thông tin!");
    }else{
    // Gửi dữ liệu đến Flask server
    this.diagnosisService.processData(formData).subscribe(response => {
      console.log('Response from server:', response);
      if (Array.isArray(response) && response.length > 0) {
         const result = response[0]; // Lấy giá trị từ phần tử đầu tiên của mảng
        console.log('Result:', result);
        if(result){

          this.mesage="Bạn có thể không bị tiểu đường"
        }
        else{
          this.mesage="Bạn có thể đang bị tiểu đường"
        }
        // Xử lý kết quả từ server ở đây
      } else {
        console.error('Invalid response format from server');
      }
      this.isModal = true;
      // Xử lý kết quả từ server ở đây
    });
  }
}
}

