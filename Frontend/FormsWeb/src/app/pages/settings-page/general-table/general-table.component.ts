import { Component, Input,  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRowDataGeneralComponent } from '../dialog-row-data-general/dialog-row-data-general.component';
@Component({
  selector: 'app-general-table',
  standalone: false,
  templateUrl: './general-table.component.html',
  styleUrl: './general-table.component.scss'
})
export class GeneralTableComponent {
  @Input() headersTable:any=[];
  @Input() dataTabel:any=[];
  @Input() titleTable:any=[];
  constructor(public dialog: MatDialog){}

  newAddRowDialog(): void {
    const dialogRef = this.dialog.open(DialogRowDataGeneralComponent, {
      data:{title:this.titleTable,headers:this.headersTable,dataTable:[]},
      disableClose:true,
      width: '30%'
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if(result.isNew==true){
        this.dataTabel.push(result['dataRow'])
      }
      else{
        this.dataTabel
      }
    })
  }
 saveRowDialog(index:number): void {
    const dialogRef = this.dialog.open(DialogRowDataGeneralComponent, {
      data:{title:this.titleTable,headers:this.headersTable,dataTable:[this.dataTabel[index]]},
      disableClose:true,
      // width: '40%'
    });
    

    dialogRef.afterClosed().subscribe(result => {
      if(result.isNew==true){
        this.dataTabel.push(result['dataRow'])
      }
      else{
        this.dataTabel[index]=result['dataRow']
      }
    })
  }
  deleteRow(index:number){
    this.dataTabel.splice(index,1)

  }
}
