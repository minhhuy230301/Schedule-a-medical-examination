import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-pots',
  templateUrl: './pots.component.html',
  styleUrls: ['./pots.component.css']
})
export class PotsComponent {
  potsFormCreate:FormGroup;

constructor(private http:HttpClient,private fireStotage:AngularFireStorage){
  this.potsFormCreate = new FormGroup(
    {
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      image: new FormControl(''),
      title1: new FormControl(''),
      descriptionTitle1: new FormControl(''),
      image1: new FormControl(''),
      title2: new FormControl(''),
      descriptionTitle2: new FormControl(''),
      image2: new FormControl(''),
      title3: new FormControl(''),
      descriptionTitle3: new FormControl(''),
      image3: new FormControl(''),
      title4: new FormControl(''),
      descriptionTitle4: new FormControl(''),
      image4: new FormControl(''),
      title5: new FormControl(''),
      descriptionTitle5: new FormControl(''),
      image5: new FormControl(''),
      title6: new FormControl(''),
      descriptionTitle6: new FormControl(''),
      image6: new FormControl(''),
      topic: new FormControl('')
  })
}

 onImageSelected(event:any){
  const file = event.target.files[0];
  const path = `pots/${file.name}`;
  const fileref = this.fireStotage.ref(path);
  console.log('ccccccccc');
  this.fireStotage.upload(path,file).snapshotChanges().pipe(
    finalize(()=>{
      console.log('bbbbbbb');
        fileref.getDownloadURL().subscribe((url) =>{
         this.potsFormCreate.controls['image'].setValue(url);
        console.log(this.potsFormCreate.controls['image']);
          console.log(url);
        })
    })
  ).subscribe();
}
  // if(file){
  //   // this.data.image = file;
  //   const path = `pots/${file.name}`;
  //   const uploadTask = await this.fireStotage.upload(path,file);
  //   const url = await uploadTask.ref.getDownloadURL();
  //   console.log(url);
  // }


  submit(){
    console.log('dddddddd');
  }
  // onSubmit(){
  //     const formData = new FormData();
  //     formData.append('name',this.data.name);
  //     if(this.data.image){
  //       formData.append('image',this.data.image);
  //     }

  //     // Sử dụng HttpClient để tải lên dữ liệu lên máy chủ
  //   this.http.post("http://localhost:8080/api/admin/add_pots", formData).subscribe((response) => {
  //     // Xử lý phản hồi từ máy chủ
  //   });
  // }

}
