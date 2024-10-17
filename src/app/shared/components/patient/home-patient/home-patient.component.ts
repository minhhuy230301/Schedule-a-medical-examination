import { Component } from '@angular/core';
import { DiseaseDto } from 'src/app/modelDTO/disease-dto';
import { GetApiWikipediaService } from 'src/app/service/wikipedia/get-api-wikipedia.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './home-patient.component.html',
  styleUrls: ['./home-patient.component.css']
})
export class HomePatientComponent {

  diseaseDto:DiseaseDto[]=[];
  htmlContent?: string;
  imageUrl?: string;
  randomElements: DiseaseDto[] = [];
  constructor(private getWikipedia: GetApiWikipediaService){}
  ngOnInit(): void {
    this.getWikipedia.getPageContent().subscribe(next =>{
      console.log(next);
      if(next){
      this.diseaseDto=next;
      if(this.diseaseDto){
        let tempArr = [...this.diseaseDto];
        while (this.randomElements.length < 3 && tempArr.length > 0) {
          const randomIndex = Math.floor(Math.random() * tempArr.length);
          const randomElement = tempArr.splice(randomIndex, 1)[0];

          this.randomElements.push(randomElement);
        }
         for(let i=0 ; i<this.randomElements.length;i++){
          if (this.randomElements[i] && this.randomElements[i].shotDescription) {
            let modifiedDescription: string = (this.randomElements[i].shotDescription as string).replace(/\\n/g, '');
            this.randomElements[i].shotDescription = modifiedDescription;
          }
             this.imageUrl = this.randomElements[i].image;
        if(this.imageUrl){
          this.imageUrl = this.imageUrl.replace(/\"/g, '').replace(/^\\/, '').replace(/\\$/, '');
          this.randomElements[i].image = this.imageUrl;
        }
       }
      }
    }

      console.log(this.diseaseDto);
      // if(this.diseaseDto){
      //   this.imageUrl = this.diseaseDto.image;
      //   if(this.imageUrl){
      //     this.imageUrl = this.imageUrl.replace(/\"/g, '').replace(/^\\/, '').replace(/\\$/, '');
      //   }
      // }

    })
}

}
