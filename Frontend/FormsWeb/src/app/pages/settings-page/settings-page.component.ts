import { Component, OnInit } from '@angular/core';
import { GeneralHeaderTables } from './generalHeaderTable';
import { MatDialog } from '@angular/material/dialog';
import { DialogRowDataGeneralComponent } from './dialog-row-data-general/dialog-row-data-general.component';

@Component({
  selector: 'app-settings-page',
  // standalone: ,
  // imports: [],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent implements OnInit {
  
  hearders:any=new GeneralHeaderTables();
  dataVarietiesTable:any=[];
  dataStandardTable:any=[];
  dataPackingTable:any=[];
  dataSizesTable:any=[];
  dataCustomerTable:any=[];
  arrayHeaders:any=[];
  arrayDatasTable:any=[];
  titlesTable:any=['טבלת זנים','טבלת תקנים','טבלת גדלים','טבלת סיטונאים','טבלת אריזות']
  ngOnInit(): void {
    
    this.arrayDatasTable=[this.dataVarietiesTable,this.dataStandardTable,this.dataSizesTable,this.dataCustomerTable,this.dataPackingTable]
    this.arrayHeaders=[this.hearders.varietiesTable,this.hearders.standardTable,this.hearders.SizesTable,this.hearders.CustomerTable,this.hearders.packingTable]
    // throw new Error('Method not implemented.');
  }


  
}
