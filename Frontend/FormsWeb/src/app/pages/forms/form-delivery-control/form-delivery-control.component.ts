import { Component, OnInit, ViewChild } from '@angular/core';
import { HeadersTableForms } from '../headersTableForms';
import { RestApiService } from '$src/app/services/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-form-delivery-control',
  standalone: false,
  templateUrl: './form-delivery-control.component.html',
  styleUrl: './form-delivery-control.component.scss'
})
export class FormDeliveryControlComponent implements OnInit{
  headersTable:any=new HeadersTableForms()
  dataForm:any={}
  jsonFeildForm:any={}
  referenceForm:any=''
  
  @ViewChild(SignaturePad) signaturePad: SignaturePad|any;
  signaturePadOptions: any = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 150,
    'canvasHeight': 150
  };
  constructor(private rastApi:RestApiService,private toast:ToastrService,private route:ActivatedRoute,private router:Router){

  }
  ngOnInit(): void {
  
    this.referenceForm = this.route.snapshot.params['reference'];
    if (this.referenceForm!=undefined){
      this.rastApi.getSpecificForm(`${this.referenceForm}`).subscribe(data=>{
        this.getDataForm(data['data_form'])
        // this.dataForm=data['data_form']
      })
    }
    else{
      this.dataForm['status_form']='new'
    }
    this.dataForm['status_form']='new'
    if(this.dataForm['status_form']=='new'){
    this.dataForm['name_form']='טופס בקרת שילוח'
    this.dataForm['date_form']=formatDate(new Date(),'dd-MM-YYYY','en')
    this.dataForm['is_edit']=true
    this.dataForm['json_field']=[{}]
    this.dataForm['json_field'][0]['signature']=''
    this.dataForm['router']='/form-delivery-control/'
    }
    this.dataForm['is_finish']=false
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    this.dataForm['json_field'][0]['signature']=this.signaturePad.toDataURL();
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  clearDraw(){
    this.signaturePad.clear(); 
  }
  getDataForm(arrayData:any){
    this.dataForm['json_field']=[]
    for(let [key,value] of Object.entries(arrayData)){
      if(key!='json_field'){
        this.dataForm[key]=value
      }
      else{
        var json_insert:any={}
        for(let [keyarr,valuearr] of Object.entries(arrayData['json_field'][0])){
          if(typeof(valuearr)=='string'){
            json_insert[keyarr]=valuearr
          }
          else{
            this.headersTable['headerTable3'].map((x:any)=>{
              x.array.map((y:any)=>{
                y['jsonField'].map((keys:any)=>{
                  if(keys.nameEnglish==keyarr){
                    if(Object.keys(keys).includes('valueChackBox')){
                      keys.valueChackBox=valuearr
                      json_insert[keyarr]=valuearr
                    }}})})})
            this.headersTable['headerTable1'].map((x:any)=>{
              if(x.nameEnglish==keyarr){
                json_insert[keyarr]=valuearr
                  x.valueChackBox=valuearr
                }
              }) 
          }
        this.dataForm['json_field'].push(json_insert)
       }
      }
    }
  }
  saveForm(){
    this.dataForm['status_form']='old'
    this.dataForm['is_edit']=false
    this.rastApi.createForm({form_data:this.dataForm}).subscribe(data=>{
      this.toast.success('טופס זה נוצר בהצלחה','טופס')
      this.router.navigate(['control-table'])
    })
  }
  updateForm(){
    this.dataForm['status_form']='old'
    this.dataForm['is_edit']=false
    this.rastApi.updateForm(`${this.dataForm['reference']}`,{form_data:this.dataForm}).subscribe(data=>{
      this.toast.success('טופס זה עודכן בהצלחה','טופס')
    })
  }
  openEditForm(){
    this.dataForm['is_edit']=!this.dataForm['is_edit']
  }
}
