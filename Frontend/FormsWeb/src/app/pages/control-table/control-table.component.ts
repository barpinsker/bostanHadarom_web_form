import { RestApiService } from '$src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-control-table',
  standalone: false,

  templateUrl: './control-table.component.html',
  styleUrl: './control-table.component.scss'
})
export class ControlTableComponent implements OnInit {
constructor(private restApi:RestApiService,private route:Router){}
  headerTable:any=[
  {nameEnglish:"reference",nameHebraw:"מ'ס טופס"},
  {nameEnglish:"name_form",nameHebraw:"שם טופס"},
  {nameEnglish:"date_form",nameHebraw:"תאריך יצירה"},
  {nameEnglish:"status_form",nameHebraw:"סטטוס טופס"},
  ]
  dataTable:any=[]

  ngOnInit(): void {
    this.restApi.getAllFormControl().subscribe(data=>{
      this.dataTable=[...data['forms']]
    })
  }
  moveForm(reference:number){
    this.route.navigate(['/form-delivery-control/',{reference:reference}])
  }
}
