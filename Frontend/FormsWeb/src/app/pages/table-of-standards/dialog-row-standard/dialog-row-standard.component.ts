import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Headers } from './headers';
import { formatDate } from '@angular/common';
import { RestApiService } from '$src/app/services/rest-api.service';
import { reference } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dialog-row-standard',
  standalone: false,
  // imports: [],
  templateUrl: './dialog-row-standard.component.html',
  styleUrl: './dialog-row-standard.component.scss'
})
export class DialogRowStandardComponent implements OnInit{
constructor( public dialogRef: MatDialogRef<DialogRowStandardComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private RestApi:RestApiService,private toast:ToastrService){}
  formData:any=new FormData();
  header:any=new Headers()
  dataRow:any={}
  nameFile_report:string=''
  nameFile_deploma:string=''
  nameFile_Document:string=''
  isUploadFile:boolean=false
  ngOnInit(): void {
    if(this.data.isNew==false){
      this.isUploadFile=true
        setTimeout(()=>{
        this.RestApi.getSpcificRow(`${JSON.stringify({indexModel:this.data.isRow==true?'0':'1',reference:this.data.reference})}`).subscribe(data=>{
            this.dataRow=data['row']
            console.log(data)
            this.dataRow['file_url_deploma']=data['row']['file_deploma']
            this.dataRow['file_url_report']=data['row']['file_report']
            this.nameFile_report=data['name_file'][0]
            this.nameFile_deploma=data['name_file'][1]
            this.dataRow['file']=data['name_file'][2]
        })
      },300)
    }
    else
    if(this.data.isRow){
    for(let h of this.header.headerDataStrandart)
      {
        if(h.type=='text')
        this.dataRow[h.nameEnglish]=''
        else{
          this.dataRow[h.nameEnglish]=[]
        }
      }
      this.dataRow['file_url_deploma']=''
      this.dataRow['file_url_report']=''
      this.dataRow['file_report']=''
      this.dataRow['file_deploma']=''
    }
    else{
      this.isUploadFile=false
      this.dataRow['nameStandard']=this.data['standarts']
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
  printData(){
    console.log(this.dataRow)
  }
  save(){
    this.dataRow['data_update']=formatDate(new Date(),'dd-MM-yyyy','en')
    this.formData.append('data',JSON.stringify(this.dataRow));
    if(this.data['isRow']==true){
      this.formData.append('indexs',JSON.stringify({'index_model':0,'index_serilazers':0}))
    }
    else{
      this.formData.append('file_document', this.dataRow['file_url'],this.dataRow['nameDocument']+'.'+this.dataRow['file'].split(".")[this.dataRow['file'].split(".").length-1]);
      this.formData.append('indexs',JSON.stringify({'index_model':1,'index_serilazers':1}))
    }
    this.RestApi.createStandards(this.formData).subscribe(data=>{
      // console.log("The save row is successfully")
      this.toast.success("The save row is successfully",'יצירה')
      this.dialogRef.close({"dataRow":this.dataRow})
    })
   
  }
  updateRow(){
    this.dataRow['data_update']=formatDate(new Date(),'dd-MM-yyyy','en')
    this.formData.append('data',JSON.stringify(this.dataRow))
    this.RestApi.updateRow(`${JSON.stringify({indexModel:this.data.isRow==true?'0':'1',reference:this.data.reference})}`,this.formData).subscribe(data=>{
      console.log("The update row is successfully")
      this.toast.success("The update row is successfully",'עדכון')
      this.dialogRef.close({"dataRow":this.dataRow})
  
    })
  }
  onNoClick(){
    this.isUploadFile=false
    this.dialogRef.close()
  }

  addReportFile(event:any)
  {
    this.dataRow['file_url_report']=file
    var file=event.target.files[0]
    if(isNaN(Number(file.name.split(".")[0].split(" ")[0]))==true)
      this.dataRow['file_report']=file.name
    else
    this.dataRow['file_report']=file.name.split(".")[0].split(" ")[0]
    this.formData.append('file_report', file,this.dataRow['file_report']+".pdf");
    var blob:any = new Blob([file], { type: "application/pdf" });
    var url = window.URL.createObjectURL(blob);
    // this.dataRow['file_report'].url=url
  }
  getFiles(file:any){
    console.log(file)
    this.RestApi.getFile(file).subscribe(blob=>{
      
      var urls:any = new Blob([blob],{ type: 'application/pdf' });
      var url = window.URL.createObjectURL(urls);
      this.openNewTab(url)
    })
  }
  openNewTab(data:any) {
    var anchor = document.createElement("a");
    anchor.href = data;
    anchor.target="_blank"
    anchor.click();
}
  addDeplomaFile(event:any)
  {
    var file=event.target.files[0]
    this.dataRow['file_url_deploma']=file

    this.dataRow['file_deploma']=file.name
    this.formData.append('file_deploma', file,file.name.split(".pdf")[0].split(" ")[0]+`(${file.name.split(".pdf")[0].split(" ")[1]})`+".pdf");
    var blob:any = new Blob([file], { type: "application/pdf" });
    var url = window.URL.createObjectURL(blob);
  }

  whatIsFile(nameFile:any){
    return nameFile.split(".")[nameFile.split(".").length-1]
  }

  addDocumentFile(event:any)
  {
    this.isUploadFile=true
    var endingNameFile:any=''
    var file=event.target.files[0]
    this.dataRow['file_url']=file
    endingNameFile=file['name'].split(".")
    this.dataRow['file']=file['name']
    // this.formData.append('file_document', file,this.dataRow['nameDocument']+'.'+endingNameFile[endingNameFile.length-1]);
    // this.dataRow['url'].url=url

  }

}
