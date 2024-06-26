import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRowStandardComponent } from './dialog-row-standard/dialog-row-standard.component';
import { RestApiService } from '$src/app/services/rest-api.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, formatDate} from '@angular/common';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-table-of-procedures',
  standalone: false,
  // imports: [],
  templateUrl: './table-of-standards.component.html',
  styleUrl: './table-of-standards.component.scss'
})
export class TableOfStandards implements OnInit{
  headerStandarts:any=[{nameEnglish:"name_standard",nameHebraw:"שם תקן"}]
  dataTableStandarts:any=[]
  dataTableStandartsBeforFilter:any=[]
  namesFilterDocument:any=[]
  dateSave:string=''
  keyword = 'name';
  openFilter:boolean=false
  
  dataStandarts:any=[
    {name:"BRC",isActive:false,index:0},
    {name:"GG",isActive:false,index:1},
    {name:"GRASP",isActive:false,index:2},
    {name:"SMETA",isActive:false,index:3},
    {name:"GG+GRASP+BRC",isActive:false,index:4}
  ]
  headerTable:any=[
    {nameEnglish:"nameStandard",nameHebraw:"שם תקן"},
    {nameEnglish:"nameDocument",nameHebraw:"שם מסמך"},
    {nameEnglish:"data_update",nameHebraw:"תאריך עדכון אחרון"},
  ]
  
  dataTable:any=[
    
  ]

  constructor(public dialog: MatDialog,private restApi:RestApiService,private http:HttpClient){
    
  }
  ngOnInit(): void {
    this.restApi.getAllData(`0`).subscribe(data=>{
      this.dataTableStandarts=[]
      for(let i of data['data_table']){
        this.dataTableStandarts.push(i)
       
      }
    })
    this.getAllNames()
    this.getAllStandartsFiles()
    this.dateSave=formatDate(new Date(),'yyyy','en')
    // throw new Error('Method not implemented.');
  }
  selectEvent(item:any) {
    // do something with selected item
    const result = this.dataTable.filter((i:any) =>i.nameDocument==item.name);
    if(result.length>0){
    this.dataTable=result
    }
    else{
      
    }
    
  }
 
  minusYear(){
    this.dateSave=Number(this.dateSave)-1<Number(formatDate(new Date(),'yyyy','en'))?(this.dateSave).toString():(Number(this.dateSave)-1).toString()
  }
  plusYear(){
    this.dateSave=Number(this.dateSave)+1<=Number(formatDate(new Date(),'yyyy','en'))+2?(Number(this.dateSave)+1).toString():this.dateSave
  }
  onChangeSearch(search: string) {
  //  this.dataTableStandarts=[]   
  this.dataTable=[...this.dataTableStandartsBeforFilter]
  }

  onFocused(e:any) {
    // do 
  }
  functionFile(index:any){
    if(this.dataTable[index]['file_document'].split(".")[1]=='docx'){
      this.convertFileWord(index)
    }
    else{
      this.convertFilePdf(index)
    }
  }
  WhatFile(index:any){
    if(Object.keys(this.dataTable[index]).includes('file_document')){
      if(this.dataTable[index]['file_document'].split(".")[1]=='docx'){
        return 'docx'
      }
      else{
        return 'pdf'
      }
    }
    return 
  }
  convertFileWord(index:any){
    if(this.dataTable[index]['file_document']!=null){
      this.restApi.getFile(this.dataTable[index]['file_document']).subscribe(blob=>{
      
        var urls:any = new Blob([blob],{ type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        var url = window.URL.createObjectURL(urls);
        this.openNewTab(url)
      })
    }
  }
  convertFilePdf(index:any){
    if(this.dataTable[index]['file_document']!=null){
      this.restApi.getFile(this.dataTable[index]['file_document']).subscribe(blob=>{
      
        var urls:any = new Blob([blob],{ type: 'application/pdf' });
        var url = window.URL.createObjectURL(urls);
        this.openNewTab(url)
      })
    }
  }
  openNewTab(data:any) {
      var anchor = document.createElement("a");
      anchor.href = data;
      anchor.target="_blank"
      anchor.click();
  }
  openDialogAddStandrats(flag:boolean,reference:number,index:number): void {
    const dialogRef = this.dialog.open(DialogRowStandardComponent, {
      data:{isRow:true,isNew:flag,reference:reference},
      disableClose:true,
      // width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(flag==true)
        this.dataTableStandarts.push(result['dataRow'])
      else{
        this.dataTableStandarts[index]=result['dataRow']
      }
    })
  }

  openDialogAddFile(flag:boolean,reference:number,index:number): void {
    console.log(this.dataStandarts)
    const dialogRef = this.dialog.open(DialogRowStandardComponent, {
      data:{standarts:this.dataStandarts[index]['name'],isRow:false,isNew:flag,reference:reference},
      disableClose:true,
      // width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(flag==true)
      this.dataTable.push(result['dataRow'])
    else{
      this.dataTable[index]=result['dataRow']
    }
      this.getAllNames()
    })

  }

  getSpecificStandardts(header:any,index:any){
    this.restApi.getSpcificStandartsTable(JSON.stringify({indexModel:"1",nameStandard:header})).subscribe(data=>{
      for(let i of this.dataStandarts){
        if(i.name!=header){
          i.isActive=false
        }
        else{
          i.isActive=true
        }
      }
      this.dataTable=[]
      for(let rows of data['dataTable']){
        this.dataTable.push(rows)
      }

    })
  }
  getAllNames(){
    this.restApi.getAllNamesDocument().subscribe(data=>{
      this.namesFilterDocument=[]
      for(let name=0;name < data['allNames'].length;name++){
        this.namesFilterDocument.push({id:name,name: data['allNames'][name]['nameFile']})
      }
    })
  }
  getAllStandartsFiles(){
    this.dataTableStandartsBeforFilter=[]
    for(let i of this.dataStandarts){
        i.isActive=false
    }
    this.restApi.getAllData(`1`).subscribe(data=>{
      this.dataTable=[]
      for(let i of data['data_table']){
        this.dataTable.push(i)
        this.dataTableStandartsBeforFilter.push(i)
      }
    })
  }
  getZipFile() {
    this.restApi.getAllFilesDocuemnts(`${this.dateSave}`).subscribe((response:Blob)=>{
      const blob=new Blob([response],{type:'application/zip'});
      // this.saveAsZip(response)
      saveAs(blob,this.dateSave+'.zip')
      // const url=window.URL.createObjectURL(blob);
      // window.open(url)
  });
  }
  

  private saveAsZip(content: Blob) : void{
    var zip = new JSZip();
    zip.file("image.pdf", content);
    zip.generateAsync({ type: "blob" })
       .then(blob => saveAs(blob,'image2.zip'));
  };

}



