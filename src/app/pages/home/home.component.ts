import { Component, OnInit } from '@angular/core';
import { DiseaseDto } from 'src/app/modelDTO/disease-dto';
import { GetApiWikipediaService } from 'src/app/service/wikipedia/get-api-wikipedia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
}
}
