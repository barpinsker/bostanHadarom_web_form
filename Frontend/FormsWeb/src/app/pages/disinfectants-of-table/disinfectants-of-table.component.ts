import { Component } from '@angular/core';

@Component({
  selector: 'app-disinfectants-of-table',
  standalone: false,
  // imports: [],
  templateUrl: './disinfectants-of-table.component.html',
  styleUrl: './disinfectants-of-table.component.scss'
})
export class DisinfectantsOfTableComponent {
  headerTable:any[]=[{nameHebraw:"מ'ס שורה",nameEnglish:"reference"},
  {nameHebraw:"תאריך",nameEnglish:"date"},
  {nameHebraw:"פרטי עקיבות התוצרת",nameEnglish:"fruit"},
  {nameHebraw:"שעה",nameEnglish:"time"},
  {nameHebraw:"כמות חומר שהוכנס למיכל",nameEnglish:"amount",type:"input"},
  {nameHebraw:"שם מתקן",nameEnglish:"correctiveName"},
  {nameHebraw:"שם חומר מסחרי",nameEnglish:"materialName"},
  {nameHebraw:"מ'ס אצווה של ומר החיטוי",nameEnglish:"a_Batch",type:"input"},
  {nameHebraw:"ממצאים",nameEnglish:"Findings"},
  {nameHebraw:"שם המוסיף",nameEnglish:"nameAdded",type:"input"},
]
dataTable:any=[]
}
