import { Component } from '@angular/core';
import { headerForms } from '../headerForms';
import { DialogRowComponent } from './dialog-row/dialog-row.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-finished-product-form',
  standalone: false,
  templateUrl: './finished-product-form.component.html',
  styleUrl: './finished-product-form.component.scss'
})
export class FinishedProductFormComponent {
  headersTables:any=new headerForms();
  dataTable:any=[]
  constructor(public dialog: MatDialog){}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogRowComponent, {
      data: {arrayRowHeader:this.headersTables.header_finished_product_general_table},
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.dataTable.push(result)
      
    });
  }
}
