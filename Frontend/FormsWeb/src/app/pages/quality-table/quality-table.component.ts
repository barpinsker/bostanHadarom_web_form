import { RestApiService } from '$src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quality-table',
  standalone: false,
  // imports: [],
  templateUrl: './quality-table.component.html',
  styleUrl: './quality-table.component.scss'
})
export class QualityTableComponent implements OnInit{
  headerTable:Array<any>=[
    {nameHebraw:"מ'ס בדיקה",nameEnglish:"reference_test"},
    {nameHebraw:"תאריך בדיקה",nameEnglish:"date_test"},
    {nameHebraw:"סטטוס בדיקה",nameEnglish:"status_test"},
    {nameHebraw:"זמן בדיקה",nameEnglish:"time_test"},
    {nameHebraw:"מנה",nameEnglish:"dose"},
    {nameHebraw:"זן",nameEnglish:"strain"},
    {nameHebraw:"פרי",nameEnglish:"fruit"},
  ]
  dataTable:Array<any>=[]



  constructor(private route:Router,private restApi:RestApiService){}
  ngOnInit(): void {
   console.log('on init')
   this.restApi.getAllQualityForm().subscribe(data=>{
    this.dataTable=[...data['all_quality_forms']]
   })
  }

  moveRouterTest(reference_test:any){
    this.route.navigate(['/quality-form',{status:'old','reference_test':reference_test}])
  }

  newTest(){
    this.route.navigate(['/quality-form',{status:'new'}])
  }

}
