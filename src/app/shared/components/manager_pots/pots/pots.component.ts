import { Pots } from './../../../../model/pots';
import { User } from './../../../../model/user';
import { UserService } from './../../../../service/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Topic } from 'src/app/model/topic';
import { PotsService } from 'src/app/service/pots/pots.service';
@Component({
  selector: 'app-pots',
  templateUrl: './pots.component.html',
  styleUrls: ['./pots.component.css']
})
export class PotsComponent implements OnInit{
  potsFormCreate:FormGroup;
  message:any;
  post:Pots[]=[];
  topic:Topic[]=[]
constructor(private http:HttpClient,private fireStotage:AngularFireStorage,
  private userService:UserService,
  private postService:PotsService){

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

   this.postService.getAllTopic().subscribe(next=>{
    console.log(next);
    this.topic = next;
    this.potsFormCreate.controls['topic'].setValue(this.topic[0]);
  },erorr =>{

  })

}
  ngOnInit(): void {}


 onImageSelected(event:any){
  const file = event.target.files[0];
  const path = `pots/${file.name}`;
  const fileref = this.fireStotage.ref(path);
  this.fireStotage.upload(path,file).snapshotChanges().pipe(
    finalize(()=>{
        fileref.getDownloadURL().subscribe((url) =>{
         this.potsFormCreate.controls['image'].setValue(url);
        console.log(this.potsFormCreate.controls['image']);
          console.log(url);
        })
    })
  ).subscribe();
}


  submit(){
    console.log('dddddddd');
    this.postService.addPots(this.potsFormCreate.getRawValue()).subscribe(response =>{
      console.log(response);
    })
  }


   // clickHere(){
  //   const data:User={
  //     "username": "duyet233",
  //     "password": "duyet187"
  //   }
  //     this.userService.forAdmin().subscribe(response=>{
  //       console.log(response+"aaaaaaaaaaa");
  //       this.message= "response";
  //     },erorr=>{
  //       console.log(erorr)
  //     });
  //   }


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
