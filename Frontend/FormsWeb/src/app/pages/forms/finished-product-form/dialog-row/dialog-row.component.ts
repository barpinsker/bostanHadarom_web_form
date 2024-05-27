import { Component, Inject} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-row',
  standalone: false,
  templateUrl: './dialog-row.component.html',
  styleUrl: './dialog-row.component.scss'
})
export class DialogRowComponent {
  constructor( public dialogRef: MatDialogRef<DialogRowComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){console.log(data['arrayRowHeader'])}
 
  dataRow:any={}
  onNoClick(): void {
    this.dialogRef.close();
  }
}


