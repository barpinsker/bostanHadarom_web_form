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



kanatFormHeaders:any=[
   {type:"מזיקים לפסילת סט",arrayHeaderButton:[{nameEnglish:"NamedAfterAnApple",nameHebraw:'ע"ש תפוח'},{nameEnglish:"ThePeachFly",nameHebraw:"זבוב האפרסק"}]},
   {type:"התחלה",arrayHeaderButton:[{nameEnglish:"validGoodClean",nameHebraw:"תקין / טוב / נקי"}]},
   {type:"נזקי טבע על פי חוזה",arrayHeaderButton:[
      {nameEnglish:"hail",nameHebraw:"ברד"},
      {nameEnglish:"heat",nameHebraw:"חום"},
      {nameEnglish:"green",nameHebraw:"ירוק"},
      {nameEnglish:"snow",nameHebraw:"שלג"},
      {nameEnglish:"storm",nameHebraw:"סערה"},
      {nameEnglish:"happened",nameHebraw:"קרה"},
      {nameEnglish:"multipleRains",nameHebraw:"גשמים מרובים"},

   ]},
   {type:"בררה",arrayHeaderButton:[
      {nameEnglish:"shellDamage",nameHebraw:"פגעי קליפה"},
      {nameEnglish:"diseasesAndPests",nameHebraw:"מחלות ומזיקים"},
      {nameEnglish:"shapeSizeUnusual",nameHebraw:"צורה / גודל / חריג"},
      {nameEnglish:"harvestingHarvests",nameHebraw:"פגעי קטיף"},
   
   ]},
   // {type:"סיכום",nameEnglish:"sumTable"},
]
headerTableFormSumingDetails:any={type:"סיכום",nameEnglish:"suming",headers:[
   {nameHebraw:'סהכ בררה',nameEnglish:'totallyClear'},
   {nameHebraw:'סהכ נזקי טבע',nameEnglish:'totalNaturalDamage'},
   {nameHebraw:'סהכ פירות שנבדקו',nameEnglish:'totalFruitTested'}]}

}



