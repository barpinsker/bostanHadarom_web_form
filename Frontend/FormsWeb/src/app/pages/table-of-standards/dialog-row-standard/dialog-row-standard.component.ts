import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Headers } from './headers';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-dialog-row-standard',
  standalone: false,
  // imports: [],
  templateUrl: './dialog-row-standard.component.html',
  styleUrl: './dialog-row-standard.component.scss'
})
export class DialogRowStandardComponent implements OnInit{
constructor( public dialogRef: MatDialogRef<DialogRowStandardComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,){}
 
  header:any=new Headers()
  dataRow:any={}
  ngOnInit(): void {
    if(this.data.isNew==false){
      this.dataRow=this.data['dataRow']
    }
    else
    if(this.data.isRow)
    for(let h of this.header.headerDataStrandart)
      {
        if(h.type=='text')
        this.dataRow[h.nameEnglish]=''
        else{
          this.dataRow[h.nameEnglish]=[]
        }
      }
    else{
      this.dataRow['nameStandard']=''
      this.dataRow['url']=''
      this.dataRow['nameDocument']=''
     
    }
    // throw new Error('Method not implemented.');
  }
  addChoise(header:string,data:any){
    this.dataRow[header].push(data)
  }
  removeChoise(header:string,data:string){
  
    this.dataRow[header].splice(this.dataRow[header].indexOf(data),1)
  }
  isChose(header:any,data:any){
    if(this.dataRow[header].includes(data)){
      return true
    }
    else{
      return false
    }
  }

  addFile(){
    // {nameEnglish:"nameStandard",nameHebraw:"שם תקן"},
    // {nameEnglish:"nameDocument",nameHebraw:"שם מסמך"},
    // {nameEnglish:"dataUpdate",nameHebraw:"תאריך עדכון אחרון"},
  }
  save(){
    this.dataRow['dataUpdate']=formatDate(new Date(),'dd-MM-yyyy','en')
    this.dialogRef.close({"dataRow":this.dataRow})
  }
  onNoClick(){
    this.dialogRef.close()
  }

  createUrlFile(){
    var fileUrl:any=document.querySelector('#file-id')
    console.log(fileUrl.value.split('\\')[2])
    
    this.dataRow['url']='C:/user/barpi/Desktop/'+fileUrl.value.split('\\')[2]
    if(this.data.isRow==true){
      this.dataRow['report']=fileUrl.value.split('\\')[2]
    }
  }
}
