import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialist } from 'src/app/model/specialist';
import { PatientService } from 'src/app/service/patient/patient.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.css']
})
export class SpecialistComponent implements OnInit {
  specialist:Specialist[] =[]
  ngOnInit(): void {

  }
  constructor(private router: Router,
    private paternService:PatientService) {
      paternService.getAllSpecialistNoAuthen().subscribe(next=>{
          this.specialist = next;
          console.log(next);

      })

  }
  onSelect(id:number) {
    this.router.navigate(['/listDoctor/',id]);
  }
}
