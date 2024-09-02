import { Component, OnInit } from '@angular/core';
import { HeadersTableForms } from '../headersTableForms';
import { RestApiService } from '$src/app/services/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-kanat-form',
  standalone: false,

  templateUrl: './kanat-form.component.html',
  styleUrl: './kanat-form.component.scss'
})
export class KanatFormComponent implements OnInit{
  referenceForm:any=''
  headerButtons:any=new HeadersTableForms()
  dataForm:any={}
  visitorOrWorker:any
  isWork:boolean=false
  constructor(private restApi:RestApiService,private toast:ToastrService,private route:ActivatedRoute,private rotuerForm:Router){}
  ngOnInit(){
    this.referenceForm = this.route.snapshot.params['reference'];
    this.visitorOrWorker=this.route.snapshot.params['workerOrVisitor']
   
    
    if (this.referenceForm!=undefined){
      this.restApi.getSpecificForm(`${this.referenceForm}`).subscribe(data=>{
        if(Object.entries(data['data_form']['json_field'][0][this.visitorOrWorker]).length==0){
        this.emptyData()
        this.dataForm['reference']=this.referenceForm
        }
        else{
        this.dataForm['is_finish']=data['data_form']['is_finish']
        this.getDataForm(data)}
      })
    }
    else{
      this.dataForm['status_form']='new'
      if(this.dataForm['status_form']=='new'){
        this.dataForm['name_form']='טופס קנט'
        this.dataForm['date_form']=formatDate(new Date(),'dd-MM-YYYY','en')
        this.dataForm['is_edit']=true
        this.dataForm['json_field']=[{workerValues:{},visitorValues:{}}]
        this.dataForm['router']='/kant-form/'
        this.dataForm['is_finish']=false
        }
    }
    this.dataForm['status_form']='new'
   
    this.emptyData()
  }
  emptyData(){
   
    var jsonEmpty:any={}
    this.headerButtons['kanatFormHeaders'].map((button:any)=>{
      jsonEmpty[button.type]={}
      button.arrayHeaderButton.map((bt:any)=>{
        jsonEmpty[button.type][bt.nameEnglish]=0
      })
    })
      jsonEmpty[this.headerButtons['headerTableFormSumingDetails'].type]={}
      this.headerButtons['headerTableFormSumingDetails']['headers'].map((headetTable:any)=>{
      jsonEmpty[this.headerButtons['headerTableFormSumingDetails'].type][headetTable.nameEnglish]=0
    })
      this.dataForm['json_field'][0][this.visitorOrWorker]=jsonEmpty
  }
  getDataForm(data:any){
    this.dataForm=data['data_form']
  }
  plus(headerType:any,headerButton:any){
     
        this.dataForm['json_field'][0][this.visitorOrWorker][headerType][headerButton]+=1
      
    switch(headerType){
      case 'נזקי טבע על פי חוזה':
        this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalNaturalDamage']+=1
        break;
      case 'בררה':
        this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totallyClear']+=1
        break;
    }
    this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalFruitTested']+=1
    if(headerType=='מזיקים לפסילת סט'){
      if(this.dataForm['json_field'][0][this.visitorOrWorker][headerType]['NamedAfterAnApple']>2||this.dataForm['json_field'][0][this.visitorOrWorker][headerType]['ThePeachFly']>2||this.dataForm['json_field'][0][this.visitorOrWorker][headerType]['NamedAfterAnApple']+this.dataForm['json_field'][0][this.visitorOrWorker][headerType]['ThePeachFly']>3){
        // invalid
        this.dataForm.is_edit=false
        this.dataForm.status_form='invalid'
      }
    }
  }
  minus(headerType:any,headerButton:any){
    this.dataForm['json_field'][0][this.visitorOrWorker][headerType][headerButton]-=this.dataForm['json_field'][0][this.visitorOrWorker][headerType][headerButton]-1>=0?1:0
    switch(headerType){
      case 'נזקי טבע על פי חוזה':
        this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalNaturalDamage']-=this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalNaturalDamage']>=0?1:0
        break;
      case 'בררה':
        this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totallyClear']-=this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalNaturalDamage']>=0?1:0
        break;
    }
    this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalFruitTested']-=this.dataForm['json_field'][0][this.visitorOrWorker]['סיכום']['totalFruitTested']>=0?1:0
  }
  saveForm(is_finish:boolean){
    
    this.dataForm['status_form']=this.dataForm.status_form=='new'?'old':this.dataForm.status_form
    this.dataForm['is_edit']=false
    this.dataForm['is_finish']=is_finish
    console.log('create',this.dataForm)
    // this.restApi.createForm({'form_data':this.dataForm}).subscribe(data=>{
    //   this.toast.success('טופס זה נוצר בהצלחה','טופס')
    //   this.rotuerForm.navigate(['control-table'])
    // },error=>{
    //   this.toast.error("בעיה ביצירת הטופס","טופס")
    // })
  }
  updateForm(is_finish:boolean){
    this.dataForm['is_edit']=false
    this.dataForm['is_finish']=is_finish
    console.log('update',this.dataForm)
    // this.restApi.updateForm(`${this.dataForm['reference']}`,{form_data:this.dataForm}).subscribe(data=>{
    //   this.toast.success('טופס זה עודכן בהצלחה','טופס')
    //   this.rotuerForm.navigate(['control-table'])
    // })
  }
  openEditForm(){
    this.dataForm['is_edit']=!this.dataForm['is_edit']
  }
}
