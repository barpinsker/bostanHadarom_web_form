import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DataInformaion } from '../data-informaion';
import { hide } from '@popperjs/core';
declare var bootstrap: any;

@Component({
  selector: 'app-dialog-order-surfaces',
  standalone: false,

  templateUrl: './dialog-order-surfaces.component.html',
  styleUrl: './dialog-order-surfaces.component.scss'
})
export class DialogOrderSurfacesComponent {
  dataInformaion:any=new DataInformaion();
  classTypeColor:any={"מגש":"span-black-orange",'שוק':'span-green','תפזורת':'span-brown'}
  itsOpen:boolean=false
  constructor(
    public dialogRef: MatDialogRef<DialogOrderSurfacesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onNoClick(): void {
    this.dialogRef.close({'arraySurface':this.data['arraySurafce']});
  }
  addSurfaceNumber(index:any){
    this.data['arraySurafce'][index].count+=1
    for(let i=0;i< this.data['arraySurafce'][index].count-this.data['arraySurafce'][index].arrayNumber.length;i++){
      if(this.data['arraySurafce'][index]!=undefined)
      this.data['arraySurafce'][index].arrayNumber.push({"numberSurf":''})
    }
  }
  minusSurfaceNumber(index:any){
    if(this.data['arraySurafce'][index]!=undefined){
      if(this.data['arraySurafce'][index].arrayNumber.length==0)
        this.data['arraySurafce'][index].count-=this.data['arraySurafce'][index].count>0?1:0
      else
      if(this.data['arraySurafce'][index].arrayNumber[this.data['arraySurafce'][index].arrayNumber.length-1].numberSurf==''){
        this.data['arraySurafce'][index].count-=this.data['arraySurafce'][index].count>0?1:0
        this.data['arraySurafce'][index].arrayNumber.pop()

      }
      if(this.data['arraySurafce'][index].count==0){
        this.data['arraySurafce'].splice(index,1)
      }
    }
  }
  addSizeSurfaces(size:any,type:any){
    var isFind:boolean=false
    if(this.data['arraySurafce'].length!=0){
    for(let i of this.data['arraySurafce']){
      if(i.size==size && i.type==type){
        i.count+=1
        isFind=true
        break
      }
    }
    if(isFind==false)
      this.data['arraySurafce'].push({size:size,type:type,count:1,arrayNumber:[],itsOpen:false})
  }
  else{
    this.data['arraySurafce'].push({size:size,type:type,count:1,arrayNumber:[],itsOpen:false})
  }
  }
  closingDropDown(idActive:any,index:any){
   
    var box:any=document.querySelector(".boxes-surface-data")
    this.data['arraySurafce'][index].itsOpen=!this.data['arraySurafce'][index].itsOpen
    
    for(let j of this.data['arraySurafce'])
      {
        
        if(j.arrayNumber.length==0){
          for(let i=0;i<j.count;i++){
            j.arrayNumber.push({"numberSurf":''})
          }
        }
        else{
          for(let i=0;i<j.count-j.arrayNumber.length;i++){
            j.arrayNumber.push({"numberSurf":''})
          }
        }
      }
    for(let i=1;i <=this.data['arraySurafce'].length;i++){
      
      // var myCollapse:any = document.getElementById('collapseExample'+(i))
      // if(myCollapse.classList.value=='collapse show'){
      //   myCollapse.classList='collapse hide'
      this.data['arraySurafce'][i-1].itsOpen=!this.data['arraySurafce'][i-1].itsOpen
      }
     
  }
}
