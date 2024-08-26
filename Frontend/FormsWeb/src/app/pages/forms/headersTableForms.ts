// from-delivery-control headers
export class HeadersTableForms{
headerTable1:any=[
   {nameEnglish:"productName",nameHebraw:"שם תוצרת"},
   {nameEnglish:"typeOfProduce",nameHebraw:"סוג תוצרת",valueChackBox:{'displayed':false,'raw':false},valueTag:["תוצ''ג","גולמי"]},
   {nameEnglish:"remake",nameHebraw:"הערות"},
]
headerTable2:any=[
   {nameEnglish:"freightCompany",nameHebraw:"חברת הובלה"},
   {nameEnglish:"truck",nameHebraw:"משאית"},
   {nameEnglish:"drive",nameHebraw:"נהג"},
]

headerTable3:any=[
   {type:"נושא",nameEnglish:"subject",array:[{nameHebraw:'ניקיון תא המטען',arraow:6,jsonField:[{nameHebraw:'שלמות תא המטען',nameEnglish:'theIntegrityOfTheTrunk',valueChackBox:{'proper':false,'abnormal':false},valueInput:""},
   {nameHebraw:'ניקיון תא המטען',nameEnglish:"cleaningTheTrunk",valueChackBox:{'proper':false,'abnormal':false},valueInput:""},
   {nameHebraw:'גופים זרים',nameEnglish:"foreignBodies",valueChackBox:{'proper':false,'abnormal':false},valueInput:""},
   {nameHebraw:'אוורור תא המטען',nameEnglish:"trunkVentilation",valueChackBox:{'proper':false,'abnormal':false},valueInput:""},
   {nameHebraw:'ריח חריג',nameEnglish:"unusualSmell",valueChackBox:{'proper':false,'abnormal':false},valueInput:""}]},
   {nameHebraw:"הובלה בקירור",nameEnglish:"refrigeratedTransport",arraow:3,jsonField:[{nameHebraw:'טמפרטורת כיול תקינה',nameEnglish:"normalCalibrationTemperature",valueChackBox:{'proper':false,'abnormal':false},valueInput:""},
   {nameHebraw:'טמפרטורה בהגעה תקינה',nameEnglish:"temperatureOnArrivalIsNormal",valueChackBox:{'proper':false,'abnormal':false},valueInput:""}]}]},
   {type:"הדרישה",nameEnglish:"theRequirement",array:[]},
   {type:"סיכום מבדק",nameEnglish:"testSummary",array:[]},
   {type:"פעולה מתקנת",nameEnglish:"correctiveAction",array:[]}
]

headerTable4:any=[
   {nameEnglish:"remakes",nameHebraw:"הערות"},
   {nameEnglish:"nameCheck",nameHebraw:"שם בודק"},
   {nameEnglish:"job",nameHebraw:"תפקיד"},
   {nameEnglish:"signature",nameHebraw:"חתימה"},]
}