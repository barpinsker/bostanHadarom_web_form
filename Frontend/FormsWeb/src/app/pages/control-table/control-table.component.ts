
import { RestApiService } from '$src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var bootstrap: any;
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
  {nameEnglish:"is_finish",nameHebraw:"מצב טופס"},
  ]
  dataTable:any=[]
  jsonForm:any={}
  ngOnInit(): void {
   
   
    // var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    // myModal.hidden()
    this.restApi.getAllFormControl().subscribe(data=>{
      this.dataTable=[...data['forms']]
    })
  }
  moveFormWorker(data:any){
   
    if(data['name_form']=='טופס קנט')
      if(data.is_finish==false){
          this.route.navigate([data['router'],{reference:data.reference,workerOrVisitor:'workerValues'}])
      }
      else{
        var myModal = new bootstrap.Modal('#exampleModal')
        if(myModal){
          this.jsonForm=data
          myModal.show()
      }
    else
      this.route.navigate([data['router'],{reference:data.reference}])
    }
    // myModal.dispose()
    
  }
  moveFormModel(workerOrVisit:string){
    var myModal = new bootstrap.Modal('#exampleModal')
    this.route.navigate([this.jsonForm['router'],{reference:this.jsonForm.reference,workerOrVisitor:workerOrVisit}])
    myModal.dispose()
  }
}
