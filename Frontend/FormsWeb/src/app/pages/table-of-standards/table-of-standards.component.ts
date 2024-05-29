import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRowStandardComponent } from './dialog-row-standard/dialog-row-standard.component';

@Component({
  selector: 'app-table-of-procedures',
  standalone: false,
  // imports: [],
  templateUrl: './table-of-standards.component.html',
  styleUrl: './table-of-standards.component.scss'
})
export class TableOfStandards {
  headerStandarts:any=[  {nameEnglish:"nameStandard",nameHebraw:"שם תקן"}, {nameEnglish:"dataUpdate",nameHebraw:"תוקף התעודה"},]
  dataTableStandarts:any=[{nameStandard:"BRC",dataUpdate:"28/05/2024"},{nameStandard:"GG",dataUpdate:"28/05/2024"},{nameStandard:"GRASP",dataUpdate:"28/05/2024"},{nameStandard:"SMETA",dataUpdate:"28/05/2024"}]
  headerTable:any=[
    {nameEnglish:"nameStandard",nameHebraw:"שם תקן"},
    {nameEnglish:"nameDocument",nameHebraw:"שם מסמך"},
    {nameEnglish:"dataUpdate",nameHebraw:"תאריך עדכון אחרון"},
  ]
  dataTable:any=[
    {nameStandard:"BRC",nameDocument:"טופס מקסים",dataUpdate:"12/12/2012"},
    {nameStandard:"GG",nameDocument:"טופס מקסים",dataUpdate:"01/12/2012"},
    {nameStandard:"GRASP",nameDocument:"טופס מקסים",dataUpdate:"01/01/2012"},
    {nameStandard:"SMETA",nameDocument:"טופס מקסים",dataUpdate:"01/01/2012"},
    {nameStandard:"GG+GRASP+BRC",nameDocument:"טופס מקסים",dataUpdate:"12/12/2012"},
  ]

  constructor(public dialog: MatDialog,){
    
  }
  openDialogAddStandrats(flag:boolean,index:number): void {
    const dialogRef = this.dialog.open(DialogRowStandardComponent, {
      data:{isRow:true,isNew:flag,dataRow:this.dataTableStandarts[index]},
      disableClose:true,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(flag==true)
        this.dataTableStandarts.push(result['dataRow'])
      else{
        this.dataTableStandarts[index]=result['dataRow']
      }
    })
  }

  openDialogAddFile(flag:boolean,index:number): void {
    const dialogRef = this.dialog.open(DialogRowStandardComponent, {
      data:{standarts:['BRC','GG','GG+GRASP+BRC'],isRow:false,isNew:flag,dataRow:this.dataTable[index]},
      disableClose:true,
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(flag==true)
      this.dataTable.push(result['dataRow'])
    else{
      this.dataTable[index]=result['dataRow']
    }
      
    })

  }
}



