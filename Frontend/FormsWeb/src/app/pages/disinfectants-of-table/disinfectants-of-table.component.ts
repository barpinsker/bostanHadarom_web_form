import { RestApiService } from '$src/app/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-disinfectants-of-table',
  standalone: false,
  // imports: [],
  templateUrl: './disinfectants-of-table.component.html',
  styleUrl: './disinfectants-of-table.component.scss'
})
export class DisinfectantsOfTableComponent implements OnInit{

  headerTable:any[]=[{nameHebraw:"מ'ס שורה",nameEnglish:"reference",type:"input"},
  {nameHebraw:"תאריך",nameEnglish:"date",type:"date"},
  {nameHebraw:"פרטי עקיבות התוצרת",nameEnglish:"product_traceability_details",type:"input"},
  {nameHebraw:"שעה",nameEnglish:"time",type:"time"},
  {nameHebraw:"כמות חומר שהוכנס למיכל",nameEnglish:"amount_of_material",type:"input"},
  {nameHebraw:"שם מתקן",nameEnglish:"correctiveName",type:"input"},
  {nameHebraw:"שם חומר מסחרי",nameEnglish:"materialName",type:"input"},
  {nameHebraw:"מ'ס אצווה של ומר החיטוי",nameEnglish:"a_Batch",type:"input"},
  {nameHebraw:"ממצאים",nameEnglish:"Findings",type:"input"},
  {nameHebraw:"שם המוסיף",nameEnglish:"nameAdded",type:"input"},
]
constructor(private restApi:RestApiService){
}
dataRow:any={}
dataTable:any=[]
closeModel:boolean=false
updateModel:any=''
ngOnInit(): void {
  this.restApi.getAllDisinfectants().subscribe(data=>{
    this.dataTable=[...data['data_row']]
  })
  this.dataRow=this.emptyDataRow()
}
emptyDataRow(){
  var newJson:any={}
  for(let data of this.headerTable){
    if(data.nameEnglish=='Findings'){
      newJson[data.nameEnglish]='0'
    }
    else newJson[data.nameEnglish]='';
  }
  return newJson
}
getNewReference(){
  this.restApi.getNewReference().subscribe(data=>{
    this.dataRow['reference']=data
  })
}
addRowToTable(){

  this.restApi.createNewRow({'data_row':this.dataRow}).subscribe(data=>{
    this.closeModel=true
  //   var myModal = new bootstrap.Modal('#exampleModal')   
  //   if(myModal){
  //     myModal.hidden()
  // }
  this.dataTable.push(this.dataRow)
  this.restApi.getNewReference().subscribe(data=>{
    this.dataRow['reference']=data
  })
  this.dataRow=this.emptyDataRow()
  })
  
  // this.emptyDataRow()
}
updateRowDisinfectants(){
  this.restApi.updateRowDisinfectants({'data_row':this.dataRow}).subscribe(data=>{
    console.log(data)
    this.updateModel.hide()
  })
}
getDataRow(data:any){
  this.updateModel=new bootstrap.Modal('#updateModal')
  if(this.updateModel){
    this.dataRow=data
    this.updateModel.show()
    
  }
  
}
}
