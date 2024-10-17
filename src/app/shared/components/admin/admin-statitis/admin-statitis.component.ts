import { PatientsAndDoctorCount } from './../../../../modelDTO/statistical/patients-and-doctor-count';
import { MonthlyAccountSummary } from './../../../../modelDTO/statistical/monthly-account-summary';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { PotsService } from 'src/app/service/pots/pots.service';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-statitis',
  templateUrl: './admin-statitis.component.html',
  styleUrls: ['./admin-statitis.component.css'],
})
export class AdminStatitisComponent implements OnInit {
  // public data: Object[];
  // public chartTitle: string;
  // public marketSettings: Object;
  // public xAsis: Object;
  // public yAsis: Object;
  public month = new Date();
  monthlyAccount:MonthlyAccountSummary[]=[];
  monthly: string[] = [];
  sum:number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  patientsAndDoctor?:PatientsAndDoctorCount;
  // constructor() {
  //   this.chartTitle = 'Thống kê người dùng';
  //   this.marketSettings = {
  //     visible: true,
  //   };
  //   this.xAsis = {
  //     title: 'Tháng',
  //     valueType: 'DateTime',
  //     edgeLabelPlacement: 'Shift',
  //     minimum: this.month.setMonth(1),
  //     maximum: this.month.setMonth(12),
  //   };
  //   this.yAsis = {
  //     title: 'Số lượng người dùng',
  //   };
  //   this.data = [
  //     {
  //       createAt: new Date(2023, 12, 30),
  //       Month: 12,
  //       SoLuong: 10,
  //     },
  //     {
  //       createAt: new Date(2023, 12, 30),
  //       Month: 12,
  //       SoLuong: 16,
  //     },
  //     {
  //       createAt: new Date(2023, 9, 30),
  //       Month: 9,
  //       SoLuong: 90,
  //     },
  //     {
  //       createAt: new Date(2023, 5, 30),
  //       Month: 8,
  //       SoLuong: 40,
  //     },
  //   ];
  // }
  constructor(private postService:PotsService) {
    this.postService.totalPatientsAndDoctor().subscribe(next=>{
      console.log("come on");

        if(next!=null){
            this.patientsAndDoctor = next;
            console.log(this.patientsAndDoctor);
            this.renderChart();

        }
    })
    this.postService.monthlyAccountSummary().subscribe(next=>{
      if(next!=null){
        this.monthlyAccount = next;
        console.log(this.monthlyAccount);

         const now = new Date();
         const  month = now.getMonth()+1;
         const year = now.getFullYear();
        for(let i=1;i<=this.monthlyAccount.length;i++){
          console.log("hahaha");

        //   this.monthly.push(this.monthlyAccount[i].monthYear)
        //   const [months, years] = this.monthly[i].split('-');
        // console.log(months, years);
        //  for(let i=month;i<=12;i++){
          this.sum[this.sum.length-i]= this.monthlyAccount[this.monthlyAccount.length-i].count;

          console.log( this.monthlyAccount[this.monthlyAccount.length-i].count);

          console.log("hihi");

          console.log(this.sum);

        //  }





        }

        this.renderChart();
      }
    })
  }
  ngOnInit(): void {


  }
  renderChart() {
    const myChart = new Chart('bubchart', {
      type: 'bar',

      data: {
        labels: [
          'Jan 2023',
          'Feb 2023',
          'Mar 2023',
          'Apr 2023',
          'May 2023',
          'Jan 2023',
          'July 2023',
          'Aug 2023',
          'Sep 2023',
          'Oct 2023',
          'Nov 2023',
          'Dec 2023',
          'Jan 2024',
        ],
        // labels: [this.month.getMonth()],
        datasets: [
          {
            label: 'Thống kê 2023',
            data: this.sum,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    const myChart2 = new Chart('piechart', {
      type: 'pie',

      data: {
        labels: ['Bác sĩ', 'Bệnh nhân'],
        // labels: [this.month.getMonth()],
        datasets: [
          {
            label: 'Thống kê 2023',
            data: [this.patientsAndDoctor ? this.patientsAndDoctor.doctorCount : 0, this.patientsAndDoctor ? this.patientsAndDoctor.patientCount : 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
