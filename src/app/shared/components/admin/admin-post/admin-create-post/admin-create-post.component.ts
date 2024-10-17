import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Pots } from 'src/app/model/pots';
import { Topic } from 'src/app/model/topic';

import { PotsService } from 'src/app/service/pots/pots.service';
import { UserService } from 'src/app/service/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-create-post',
  templateUrl: './admin-create-post.component.html',
  styleUrls: ['./admin-create-post.component.css']
})
export class AdminCreatePostComponent {
  htmlContent='';
  config: AngularEditorConfig = {
    editable:true,
    spellcheck:true,
    height:'15rem',
    minHeight:'5rem',
    placeholder:'Enter text here... ',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial'
  }
  potsFormCreate:FormGroup;
  message:any;
  post:Pots[]=[];
  topic:Topic[]=[]
constructor(private http:HttpClient,private fireStotage:AngularFireStorage,
  private userService:UserService,
  private postService:PotsService,
  private toastrService:ToastrService,
  private router:Router){

  this.potsFormCreate = new FormGroup(
    {
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      image: new FormControl(''),
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
    if(this.potsFormCreate.valid){
    this.postService.addPots(this.potsFormCreate.getRawValue()).subscribe(response =>{
      console.log(response);
      this.toastrService.success("Thêm bài viết thành công");
      this.router.navigate(['admin/post']);
    })
  }else{
    let str="";
    let flg = false;
    if(this.potsFormCreate.get('name')?.hasError('required')){
      str += "Tiêu đề, ";
      flg = true;
    }
    if(this.potsFormCreate.get('description')?.hasError('required')){
      str += " Nội dung ";
      flg = false;
    }
     if(flg){
      str = str.replace(',',"")
     }
      this.toastrService.error(str+" chưa được nhập");
}
}


}
