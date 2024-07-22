import { HttpClient } from '@angular/common/http';
import { PotsService } from './../../../../../service/pots/pots.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pots } from 'src/app/model/pots';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  post:Pots[]=[];
  isZoomed = false;

  constructor(private postService:PotsService,
    private http:HttpClient){}
    getPost(){
      this.postService.getAllPost(1).subscribe(next=>{
        console.log(next);
        this.post = next;
      },erorr=>{

      })
    }

  ngOnInit(): void {
    this.getPost();
  }

  //delete post
  deletePost(id:number){
    this.postService.removePost(id).subscribe(next=>{
      console.log("remove post"+next);
      this.getPost;
    },erorr=>{
      console.log(erorr);
    })
  }


  //zoom picture
  toggleZoom() {
    this.isZoomed = !this.isZoomed;
  }

  get zoomedImageStyle() {
    if (this.isZoomed) {
      return {
        width: '300px', // Kích thước ảnh khi zoom
        height: '300px', // Kích thước ảnh khi zoom
        cursor: 'zoom-out' // Đổi con trỏ chuột khi ảnh đã được zoom
      };
    } else {
      return {
        width: '100px', // Kích thước ảnh khi không zoom
        height: '100px', // Kích thước ảnh khi không zoom
        cursor: 'zoom-in' // Đổi con trỏ chuột khi ảnh chưa được zoom
      };
    }
  }

}
