import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Patients } from 'src/app/model/patients';
import { Specialist } from 'src/app/model/specialist';
import { PatientService } from 'src/app/service/patient/patient.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';
import * as mapboxgl from 'mapbox-gl';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-record-register-as-doctor',
  templateUrl: './record-register-as-doctor.component.html',
  styleUrls: ['./record-register-as-doctor.component.css'],
})
export class RecordRegisterAsDoctorComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  specialist: Specialist[] = [];
  patient: Patients = {
    id: 0,
  };
  dataPatient: FormGroup;
  private map!: mapboxgl.Map;
  private geocoder!: mapboxgl.GeolocateControl;
  private marker!: mapboxgl.Marker;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here... ',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };
  constructor(
    private patienstService: PatientService,
    private userAuthService: UserAuthService,
    private fireStotage: AngularFireStorage,
    private toartService: ToastrService
  ) {
    this.dataPatient = new FormGroup({
      username: new FormControl('', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      gender: new FormControl('', [Validators.required]),
      date: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ]),
      houseAddress: new FormControl(''),
      workAddress: new FormControl('', [Validators.required]),
      specialist: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      issue: new FormControl('', [Validators.required]),
      strengths: new FormControl(''),
      certificate: new FormControl(''),
    });

    this.patienstService.getAllSpecialist().subscribe((next) => {
      this.specialist = next;
    });
    this.patienstService
      .getDataPatient(this.getUsername())
      .subscribe((next) => {
        if (next) {
          console.log('lalaalalalal');
          const datePipe = new DatePipe('en-US');
          const inputDateString = next.date;
          // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
          const inputDate = new Date(inputDateString);
          const formattedDate = datePipe.transform(inputDate, 'yyyy-MM-dd');
          next.date = formattedDate;
          this.patient = next;
          console.log(this.patient);
          console.log(this.patient.username);

          this.buildForm();
        }
      });
  }
  ngOnInit(): void {
    this.initializeMap();
    // this.initializeGeocoder();
  }
  // change image
  onImageSelected(event: any) {
    const file = event.target.files[0];
    const path = `pots/${file.name}`;
    const fileref = this.fireStotage.ref(path);
    this.fireStotage
      .upload(path, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileref.getDownloadURL().subscribe((url) => {
            this.dataPatient.controls['certificate'].setValue(url);
            console.log(this.dataPatient.controls['certificate']);
            console.log(url);
          });
        })
      )
      .subscribe();
  }
  private initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      accessToken:
        'pk.eyJ1IjoiZGF0YWl0aTI0IiwiYSI6ImNsbmttcTJzYjA5b3MyamxrdjVsaWtic3AifQ.UWLyDIStMSh6knLilI8fOQ',
    }); // Thêm sự kiện click cho bản đồ
    this.map.on('click', (event) => this.handleMapClick(event));
    //   this.marker = new mapboxgl.Marker();
    //   this.marker.addTo(this.map);
  }

  // Xử lý sự kiện click trên bản đồ
  private handleMapClick(event: mapboxgl.MapMouseEvent) {
    const lngLat = event.lngLat;
    this.getAddressFromCoordinates(lngLat);
  }
  //Sử dụng Geocoding API để lấy địa chỉ từ tọa độ
  private getAddressFromCoordinates(lngLat: mapboxgl.LngLat) {
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=pk.eyJ1IjoiZGF0YWl0aTI0IiwiYSI6ImNsbmttcTJzYjA5b3MyamxrdjVsaWtic3AifQ.UWLyDIStMSh6knLilI8fOQ`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Check if features array is not empty
        if (data.features && data.features.length > 0) {
          // Get the first feature
          const feature = data.features[0]; // Check if the feature has a center property

          if (feature.center) {
            const coordinates = feature.center; // Continue with the rest of your code

            const address = feature.place_name;
            console.log('Địa chỉ:', address);
            this.dataPatient.controls['workAddress'].setValue(address);
          } else {
            console.error('Không tìm thấy tọa độ trong đối tượng feature.');
          }
        } else {
          console.error('Không tìm thấy đối tượng feature trong kết quả.');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi gọi Geocoding API:', error);
      });
  }

  // private initializeGeocoder() {
  //   this.geocoder = new mapboxgl.GeolocateControl({
  //     positionOptions: {
  //       enableHighAccuracy: true
  //     },
  //     trackUserLocation: true
  //   });

  //   this.map.addControl(this.geocoder);

  //   // Lắng nghe sự kiện khi người dùng chọn một địa chỉ từ gợi ý
  //   this.geocoder.on('result', (event) => {

  //   });
  // }
  //  // Hàm được gọi khi người dùng click nút Tìm kiếm
  //  geocodeAddress() {
  //   const addressInput = document.getElementById('addressInput') as HTMLInputElement;
  //   const address = addressInput.value;

  //   // Sử dụng Geocoding API để tìm kiếm địa chỉ
  //   const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF0YWl0aTI0IiwiYSI6ImNsbmttcTJzYjA5b3MyamxrdjVsaWtic3AifQ.UWLyDIStMSh6knLilI8fOQ`;

  //   fetch(apiUrl)
  //     .then(response => response.json())
  //     .then(data => {
  //       // Lấy kết quả và tìm tọa độ
  //       const coordinates = data.features[0].center;

  //       // Kiểm tra xem this.marker và this.map có được khởi tạo hay không
  //       if (coordinates && coordinates.lng && this.marker && this.map) {
  //         // Cập nhật vị trí của marker
  //         this.marker.setLngLat(coordinates);

  //         // Di chuyển bản đồ đến vị trí
  //         this.map.flyTo({
  //           center: coordinates,
  //           zoom: 15
  //         });
  //       } else {
  //         console.error('Không tìm thấy tọa độ hoặc marker/map chưa được khởi tạo.');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Lỗi khi gọi Geocoding API:', error);
  //     });
  // }
  // lay username cua nguoi dung
  getUsername() {
    const username: any = this.userAuthService.getAccount();
    let arr = [];
    arr.push(username);
    if (username != null && username) {
      for (let i = 0; i < arr.length; i++) {
        return arr[i].username;
      }
    }
  }
  buildForm() {
    this.dataPatient.controls['username'].setValue(this.getUsername());
    this.dataPatient.controls['name'].setValue(this.patient.name);
    this.dataPatient.controls['email'].setValue(this.patient.email);
    this.dataPatient.controls['phoneNumber'].setValue(this.patient.phoneNumber);
    this.dataPatient.controls['gender'].setValue(this.patient.gender);
    this.dataPatient.controls['date'].setValue(this.patient.date);
    this.dataPatient.controls['houseAddress'].setValue(this.patient.address);
  }
  previews: string[] = [];
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  getDataPatientFromForm() {
    if (this.dataPatient.valid) {
      this.patienstService
        .registerDoctor(this.dataPatient.getRawValue())
        .subscribe(
          (next) => {
            if (next == true) {
              this.toartService.success('Đăng ký thành công');
            } else {
              this.toartService.error('Email đã bị trùng');
            }
          },
          (error) => {
            this.toartService.success('Có vẻ hệ thống bị lỗi');
          }
        );
    } else {
      this.toartService.error('Kiểm tra lại thông tin.');
    }
  }
}
