import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PotsService } from 'src/app/service/pots/pots.service';
import { Pots } from 'src/app/model/pots';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Topic } from 'src/app/model/topic';
@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})

export class AdminPostComponent implements OnInit{
posts:Pots[]=[];
topics:Topic[]=[];
post:Pots={id:0};
data:string="";
formSearch: FormGroup;
zoomedImageIndex: number | null = null;
public Editor = ClassicEditor;
isPost:Boolean=true;
showModalDelete = false;
config : any;
 constructor(private postService:PotsService,
    private toastService:ToastrService,
    private router:Router){
      this.postService.getAllTopic().subscribe(next=>{
        this.topics = next;
        console.log(next);

      },erorr =>{
        console.log(erorr);
      })
      this.formSearch = new FormGroup({
        name: new FormControl(""),
        topic_id: new FormControl("")
      });
      }
  ngOnInit(): void {
    this.getPost();
    this.loadPage();
  }

  // phân trang
  pageChanged(event: number) {
    this.config.currentPage = event;
  }

// mở modal
openModalDelete(id:number){
  this.postService.getPostById(id).subscribe(next =>{
    this.post = next;
    this.showModalDelete = !this.showModalDelete;
  },erorr =>{
    console.log("không lấy được dữ liệu")
  })
}

// xóa modal
closeModalDelete(){
  this.showModalDelete = false;
}
clickedOutside():void{
  this.showModalDelete = false;
}
showCreate(){
  this.isPost = false;
}
showManage(){
  this.isPost = true;
}
      getPost(){
        this.postService.getAllPost(1).subscribe(next=>{
          console.log(next);
          this.posts = next;
        },erorr=>{

        })
      }

 //zoom picture
 toggleZoom(index:number) {
  this.zoomedImageIndex = this.zoomedImageIndex === index ? null : index;
}


//xóa post
deletePost(id:number){
  this.postService.removePost(id).subscribe(next=>{
    console.log("remove post"+next);
    this.getPost();
    this.closeModalDelete();
    this.toastService.success("Xóa bài viết thành công");
  },erorr=>{
    this.toastService.error("Xóa bài viết không thành công");
    console.log(erorr);
  })
}
nextPage(id:string) {
  this.router.navigate(['admin/post/edit_post',id]);
}

loadPage(){
  this.config = {
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: this.posts.length
  }
}

// reset lại trang
resetPage() {
  this.formSearch.controls['name'].setValue("")
  this.ngOnInit();
  }
// tìm kiếm
  findByNameAndTopic(){
    if(this.formSearch.value.topic_id==""){
      this.formSearch.value.topic_id = 1;
    }
    this.postService.findAllByNameAndTopic(this.formSearch.value.name,this.formSearch.value.topic_id).subscribe(next=>{
      if(!next || next.length === 0){
        this.data="Hiện tại không có dữ liệu";
        console.log(this.data);

      }
      else{
        this.data="";
      }
      this.posts=next;
      this.loadPage();
      }

    )
  }
}

