import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-row-data-general',
  standalone: false,
  templateUrl: './dialog-row-data-general.component.html',
  styleUrl: './dialog-row-data-general.component.scss'
})
export class DialogRowDataGeneralComponent {
  dataRow:any={}
  constructor(public dialogRef: MatDialogRef<DialogRowDataGeneralComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      if(data['dataTable'].length==1){
        this.dataRow=data['dataTable'][0]
      }
    }

// headers
    // dataTable


    onNoClick(){
      this.dialogRef.close()
    }
    addRow(){
      this.dialogRef.close({isNew:true,dataRow:this.dataRow})
    }
    updateRow(){
      this.dialogRef.close({isNew:false,dataRow:this.dataRow})
    }

}
