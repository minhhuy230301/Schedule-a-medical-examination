import { Component } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Pots } from 'src/app/model/pots';
import { PatientService } from 'src/app/service/patient/patient.service';
import { UserAuthService } from 'src/app/service/user/user-auth.service';


@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent {
  post:Pots={id:0};
  constructor(private activatedRoute:ActivatedRoute,
    private patientService:PatientService,
    private sanitizer: DomSanitizer,
    private userAuthService:UserAuthService,){
    this.activatedRoute.paramMap.subscribe(next=>{
      const id = next.get('id');
      if(id!=null){
        const idParse = parseInt(id);
        this.patientService.getPostById(idParse).subscribe(next=>{
          this.post = next;
          console.log(this.post);
        })
      }
    })
  }
  sanitizeHtml(html?: string): SafeHtml {
    if(!html){
      html=""
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
}
