import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Pots } from 'src/app/model/pots';
import { Topic } from 'src/app/model/topic';
import { PotsService } from 'src/app/service/pots/pots.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-admin-update-post',
  templateUrl: './admin-update-post.component.html',
  styleUrls: ['./admin-update-post.component.css']
})
export class AdminUpdatePostComponent {
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
  potsFormUpdate:FormGroup;
  message:any;
  post:Pots={
    id:0};
  topic:Topic[]=[];
  imageUrl!:string;
constructor(private fireStotage:AngularFireStorage,
  private postService:PotsService,
  private toastrService:ToastrService,
  private router:Router,
  private activatedRoute:ActivatedRoute,){

  this.potsFormUpdate = new FormGroup(
    {
      id:new FormControl(this.post.id),
      name: new FormControl(this.post.name,[Validators.required]),
      description: new FormControl(this.post.description,[Validators.required]),
      image: new FormControl(this.post.image),
      topic: new FormControl(this.post.topic)
  })
  this.activatedRoute.paramMap.subscribe(next=>{
    const id = next.get('id');
    if(id!=null){
      const idParse = parseInt(id);

      this.postService.getPostById(idParse).subscribe(next=>{
        this.post = next;
        console.log(this.post.id+"null");
        if(this.post.image){
          this.imageUrl = this.post.image;
        }
        this.buildForm();
        this.postService.getAllTopic().subscribe(next=>{
          this.topic = next;
        },erorr=>{
          console.log("eorr");
        })
      })
    }
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
         this.potsFormUpdate.controls['image'].setValue(url);
        console.log(this.potsFormUpdate.controls['image']);
          console.log(url);
        })
    })
  ).subscribe();
}
buildForm(){
  this.potsFormUpdate.controls['id'].setValue(this.post.id);
  this.potsFormUpdate.controls['name'].setValue(this.post.name);
  this.potsFormUpdate.controls['description'].setValue(this.post.description);
  this.potsFormUpdate.controls['image'].setValue(this.post.image);
  this.potsFormUpdate.controls['topic'].setValue(this.post.topic);
}

  submit(){
    console.log('dddddddd');
    this.postService.updatePost(this.potsFormUpdate.getRawValue()).subscribe(response =>{
      console.log(response);
      this.toastrService.success("Update bai viet thanh cong");
      this.router.navigate(['admin/post']);
    })
  }
  // lấy lại topic cũ
  campareFn(t1:any,t2:any){
    return t1.name == t2.name && t1.id == t2.id;
  }
}
