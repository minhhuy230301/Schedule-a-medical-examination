import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pots } from 'src/app/model/pots';
import { Topic } from 'src/app/model/topic';
import { PotsService } from 'src/app/service/pots/pots.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-update-posts',
  templateUrl: './update-posts.component.html',
  styleUrls: ['./update-posts.component.css']
})
export class UpdatePostsComponent {
  post:Pots={
    id:0};
  topic:Topic[]=[];
  imageUrl!:string;
  postForm:FormGroup;
constructor(private activeRouter:ActivatedRoute,private postService: PotsService,private fireStotage:AngularFireStorage){

  this.postForm = new FormGroup(
    {
      id:new FormControl(this.post.id),
      name: new FormControl(this.post.name,[Validators.required]),
      description: new FormControl(this.post.description,[Validators.required]),
      image: new FormControl(this.post.image),
      title1: new FormControl(this.post.title1),
      descriptionTitle1: new FormControl(this.post.descriptionTitle1),
      image1: new FormControl(this.post.image1),
      title2: new FormControl(this.post.title2),
      descriptionTitle2: new FormControl(this.post.descriptionTitle2),
      image2: new FormControl(this.post.image2),
      title3: new FormControl(this.post.title3),
      descriptionTitle3: new FormControl(this.post.descriptionTitle3),
      image3: new FormControl(this.post.image3),
      title4: new FormControl(this.post.title4),
      descriptionTitle4: new FormControl(this.post.descriptionTitle4),
      image4: new FormControl(this.post.image4),
      title5: new FormControl(this.post.title5),
      descriptionTitle5: new FormControl(this.post.descriptionTitle5),
      image5: new FormControl(this.post.image5),
      title6: new FormControl(this.post.title6),
      descriptionTitle6: new FormControl(this.post.descriptionTitle6),
      image6: new FormControl(this.post.image6),
      topic: new FormControl(this.post.topic)
  })


  this.activeRouter.paramMap.subscribe(next=>{
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
          this.postForm.controls['topic'].setValue(this.topic[0]);
        },erorr=>{
          console.log("eorr");

        })
      })
    }
  })
}
buildForm(){
  this.postForm.controls['id'].setValue(this.post.id);
  this.postForm.controls['name'].setValue(this.post.name);
  this.postForm.controls['description'].setValue(this.post.description);
  this.postForm.controls['image'].setValue(this.post.image);
  this.postForm.controls['title1'].setValue(this.post.title1);
  this.postForm.controls['descriptionTitle1'].setValue(this.post.descriptionTitle1);
  this.postForm.controls['image1'].setValue(this.post.image1);
  this.postForm.controls['title2'].setValue(this.post.title2);
  this.postForm.controls['descriptionTitle2'].setValue(this.post.descriptionTitle2);
  this.postForm.controls['image2'].setValue(this.post.image2);
  this.postForm.controls['title3'].setValue(this.post.title3);
  this.postForm.controls['descriptionTitle3'].setValue(this.post.descriptionTitle3);
  this.postForm.controls['image3'].setValue(this.post.image3);
  this.postForm.controls['title4'].setValue(this.post.title4);
  this.postForm.controls['descriptionTitle4'].setValue(this.post.descriptionTitle4);
  this.postForm.controls['image4'].setValue(this.post.image4);
  this.postForm.controls['title5'].setValue(this.post.title5);
  this.postForm.controls['descriptionTitle5'].setValue(this.post.descriptionTitle5);
  this.postForm.controls['image5'].setValue(this.post.image5);
  this.postForm.controls['title6'].setValue(this.post.title6);
  this.postForm.controls['descriptionTitle6'].setValue(this.post.descriptionTitle6);
  this.postForm.controls['image6'].setValue(this.post.image6);
}
onImageSelected(event:any){
  const file = event.target.files[0];
  const path = `pots/${file.name}`;
  const fileref = this.fireStotage.ref(path);
  this.fireStotage.upload(path,file).snapshotChanges().pipe(
    finalize(()=>{
        fileref.getDownloadURL().subscribe((url) =>{
         this.postForm.controls['image'].setValue(url);
        console.log(this.postForm.controls['image']);
          console.log(url);
        })
    })
  ).subscribe();
}


  submit(){
    console.log('dddddddd');
    console.log(this.postForm.getRawValue);

    this.postService.updatePost(this.postForm.getRawValue()).subscribe(response =>{
      console.log(response);
    })
  }

}
