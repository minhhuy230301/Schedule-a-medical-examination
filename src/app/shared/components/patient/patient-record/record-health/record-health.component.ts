import { Component } from '@angular/core';

@Component({
  selector: 'app-record-health',
  templateUrl: './record-health.component.html',
  styleUrls: ['./record-health.component.css']
})
export class RecordHealthComponent {
bmi: number = 0;
x:number=0;
y:number=0;
calculateBMI() {
  if(this.x != 0 && this.y!=0)
  this.bmi = this.x / (this.y * 2);
  this.bmi = parseFloat(this.bmi.toFixed(2));
}
}
