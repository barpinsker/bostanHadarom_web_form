import { Component, OnInit } from '@angular/core';
import { HeaderButtonQuality } from './headersTableQualityButtons';
import { RestApiService } from '$src/app/services/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'app-quality-form',
  standalone: false,
  // imports: [],
  templateUrl: './quality-form.component.html',
  styleUrl: './quality-form.component.scss'
})
export class QualityFormComponent  implements OnInit{

  headersButton:any=new HeaderButtonQuality().headerButtons
  arraySelect:any=new HeaderButtonQuality().arraySelect
  dataForm:any={json_field:[{}]}
  status_form:any=''
  questionModel:any=''
//  {nameEnglish:"summary",nameHebraw:"סיכום",arrayHeaderType:[
//   {nameHebrew:'סה"כ לא תקינים',nameEnglish:"totallyNotNormal"},
//   {nameHebrew:'סה"כ פסולים',nameEnglish:"totallyInvalid"},
//   {nameHebrew:"הערות",nameEnglish:"remarks"},
// ],type:"end"},

  constructor(private restApi:RestApiService,private route:ActivatedRoute,private toast:ToastrService,private Router:Router){}

  ngOnInit(): void {
    this.status_form = this.route.snapshot.params['status'];
    this.dataForm['reference_test'] = this.route.snapshot.params['reference_test'];
    this.questionModel=new bootstrap.Modal('#questionModal')
    if(this.status_form=='new'){
      this.dataForm={'name_form':'טסט בקרת איכות',date_test:formatDate(new Date(),'dd-MM-yyyy','en'),time_test:formatDate(new Date(),'H:mm','en'),fruit:'אפרסמון',dose:'1234',strain:'טריומף',json_field:[{}],is_edit:true,is_finish:false}
      this.restApi.getNewReferenceTest().subscribe(data=>{
      
        this.dataForm['reference_test']=data
      })
      for(let header of this.headersButton){
        for(let key of header.arrayHeaderType){
          if(key.nameEnglish!='date_test'&&key.nameEnglish!='reference_test'&&key.nameEnglish!='fruit'&&key.nameEnglish!='dose'){
          if (header.nameEnglish!='form' && key.nameEnglish!='remarks'){
            this.dataForm['json_field'][0][key.nameEnglish]=0
          }
          else{
            this.dataForm['json_field'][0][key.nameEnglish]=''
          }
          }
          else{
            
          }
        }
      }
    }
    else{
      this.getDataTest()
    }
  }
  optionSelectSize(header:any,index:any){
    switch (header){
      case 'packagingType':
        this.arraySelect[this.dataForm.strain]['size']=this.arraySelect[this.dataForm.strain][header][index].value
        break;
      case 'size':
        this.dataForm['json_field'][0]['totalUnits']=this.arraySelect[this.dataForm.strain][header][index]
        console.log(this.dataForm['json_field'][0]['totalUnits'])
        this.arraySelect[this.dataForm.strain]['totalUnits']=this.arraySelect[this.dataForm.strain]['size']
        break;
    }
    if(header!='size' && header!='totalUnits')
    {
      this.dataForm['json_field'][0][header]=this.arraySelect[this.dataForm.strain][header][index].nameHebraw
    }
    else{
      this.dataForm['json_field'][0][header]=this.arraySelect[this.dataForm.strain][header][index]
    }
  }
  getDataTest(){
    this.restApi.getSpecificQualityForm(`${this.dataForm['reference_test']}`).subscribe(data=>{
      this.dataForm=data['data_row']
    })
  }
  isStartWork(){
    for(let header of this.headersButton){
      for(let key of header.arrayHeaderType){
        if(this.dataForm['json_field']!=undefined)
        if(Object.entries(this.dataForm['json_field']).length!=0){
        if(header.nameEnglish=='form'){
          if(this.dataForm['json_field'][0][key.nameEnglish]=='')
            return true
          }
        }
      }
    }
    return false
  }
  Pluse(nameHeader:any){
    this.dataForm['json_field'][0][nameHeader]+=1
    this.dataForm['json_field'][0]['totallyNotNormal']+=1

  }
  minus(nameHeader:any){
    this.dataForm['json_field'][0][nameHeader]-=this.dataForm['json_field'][0][nameHeader]-1>=0?1:0
    this.dataForm['json_field'][0]['totallyNotNormal']-=this.dataForm['json_field'][0]['totallyNotNormal']-1>=0?1:0
  }

  openDialog(){
    this.questionModel.show()
  }
  createForm(){
    
    this.dataForm.is_edit=false
    this.restApi.createQualityForm({data_row:this.dataForm}).subscribe(data=>{
      this.questionModel.hide()
      this.toast.success("הבדיקה נוצרה בהצלחה","טופס בקרת איכות מצב בדיקה")
      this.Router.navigate(['/quality-table'])

    })
  }
  updateForm(){
    this.dataForm.is_edit=false
    this.restApi.updateQualityForm({data_row:this.dataForm}).subscribe(data=>{
      this.questionModel.hide()
      this.toast.success("הבדיקה נוצרה בהצלחה","טופס בקרת איכות מצב בדיקה")
      this.Router.navigate(['/quality-table'])
    })
  }
}

