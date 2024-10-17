import { PatientService } from 'src/app/service/patient/patient.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDTO } from 'src/app/modelDTO/post-dto';
import { PotsService } from 'src/app/service/pots/pots.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CategoriesService } from 'src/app/service/categories/categories.service';
import { Topic } from 'src/app/model/topic';
import { UserAuthService } from 'src/app/service/user/user-auth.service';

@Component({
  selector: 'app-categories-content',
  templateUrl: './categories-content.component.html',
  styleUrls: ['./categories-content.component.css']
})
export class CategoriesContentComponent {
  postDto:PostDTO[]=[];
  topic:Topic[]=[];
  config : any;
  data:string="";
  constructor(private sanitizer: DomSanitizer,
    private router:Router,
    private patientService:PatientService,
    private categoriesService:CategoriesService,
    private activatedRoute:ActivatedRoute,
    private userAuthService:UserAuthService,){
      this.activatedRoute.paramMap.subscribe(next=>{
        const id = next.get('id');

        if(id!=null){
          const idParse = parseInt(id);
          console.log(idParse);

          this.patientService.getAllPostId(idParse).subscribe(next=>{
            this.postDto = next;
            this.loadPage();
            console.log(next);


            categoriesService.getAllTopic().subscribe(next=>{
              this.topic = next;
              for (let i = 0; i < this.topic.length; i++) {
                if (this.topic[i].id === idParse ) {
                  this.topic.splice(i, 1);
                  i--; // Giảm giá trị của i để không bỏ qua phần tử tiếp theo sau khi loại bỏ
                }
              }
              console.log("hahahahaha");

              console.log(this.topic);

            })
          })
        }
      })
  }
  sanitizeHtml(html?: string): SafeHtml {
    if(!html){
      html="";
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  getRoles(){
    const username:any = this.userAuthService.getRoles();
    console.log(username);

    let arr = [];
    arr.push(username)
    if(username != null && username){
      for(let i=0;i<arr.length;i++){
        return  arr[i].name;
    }
  }
  }
  onSelect(i?:number) {
    if(i!==undefined)
    this.router.navigate(['/categories/',i]);
  }

  pageChanged(event: number) {
    this.config.currentPage = event;
  }
  loadPage(){
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.postDto.length
    }
  }
}
