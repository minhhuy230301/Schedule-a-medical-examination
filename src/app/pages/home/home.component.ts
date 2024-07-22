import { Component, OnInit } from '@angular/core';
import { GetApiWikipediaService } from 'src/app/service/wikipedia/get-api-wikipedia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageTilte = "Hôn mê" ;
  pageContent:any;
  constructor(private getApi : GetApiWikipediaService){}
  ngOnInit(): void {
    console.log("aaaaaaaaaaa");
  this.getApi.getPageContent(this.pageTilte).subscribe((next:any)=>{
    this.pageContent = next;

    console.log(next);

  })
}
}
