import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DiseaseDto } from 'src/app/modelDTO/disease-dto';
import { GetApiWikipediaService } from 'src/app/service/wikipedia/get-api-wikipedia.service';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.css']
})
export class DiseaseComponent {
  htmlContent:string='';
  disease?:DiseaseDto;
  constructor( private activatedRoute:ActivatedRoute,
    private wikipedia:GetApiWikipediaService,private sanitizer: DomSanitizer){
    this.activatedRoute.paramMap.subscribe(next=>{
      const title = next.get('title');
      if(title!=null){
        const titles = title.replace(" ","_");
          console.log(titles);
          wikipedia.getPageContentByTitle(titles).subscribe(next=>{
              console.log(next);
              if(next){
                  this.disease=next;
                  if(this.disease?.body){
                  this.htmlContent = this.disease.body;
                  }
              }

          });
      }
    })
}
sanitizeHtml(html?: string): SafeHtml {
  if(!html){
    html=""
  }
  return this.sanitizer.bypassSecurityTrustHtml(html);
}
}
