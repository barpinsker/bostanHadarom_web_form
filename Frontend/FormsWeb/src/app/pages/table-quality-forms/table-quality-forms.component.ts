import { Component } from '@angular/core';

@Component({
  selector: 'app-table-quality-forms',
  standalone: false,
  // imports: [],
  templateUrl: './table-quality-forms.component.html',
  styleUrl: './table-quality-forms.component.scss'
})
export class TableQualityFormsComponent {

  headerTable:any=[{nameHebraw:"מספר טופס",nameEnglish:"reference"},
  {nameHebraw:"שם טופס",nameEnglish:"nameForms"},{nameHebraw:"תאריך הנפקה",nameEnglish:"dateForms"},
  {nameHebraw:"עודכן לאחרונה",nameEnglish:"lastUpdated"},{nameHebraw:"סטטוס טופס",nameEnglish:"status"},
  {nameHebraw:"מצב עריכה",nameEnglish:"situation"},{nameHebraw:"פעולות טפסים",nameEnglish:"actions"}]
  dataTable:any=[]


  fromclicked(){
    console.log()
  }
}
