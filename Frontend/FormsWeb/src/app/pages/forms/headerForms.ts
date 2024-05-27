export class headerForms{

        // header for shipping form

        headerShiipingTitle:any=[
        {name:""},
        {name:":מספר נוהל ",value:"6"},
        {name:":מהדורה ",value:"1"},
        {name:":תאריך תוקף",value:"1.10.17"},
        {name:":מס' עמוד",value:"עמוד 1 מתוך 1"},
   
    
        ]


        headerShippingTable1:any=[
        {headerEnglish:"productName",headerHebraw:"שם התוצרת"},
        {headerEnglish:"typeOfProduce",headerHebraw:"סוג התוצרת"},
        {headerEnglish:"",headerHebraw:""},
        ]
        headerShippingTable2:any=[
        {headerEnglish:"nameCompany",headerHebraw:"חברת הובלה"},     
        {headerEnglish:"numberTruck",headerHebraw:"משאית"},                     
        {headerEnglish:"nameDriver",headerHebraw:"נהג"},     
        ]

        headerShippingTable3:any=[
                {type:"נושא",array:[{nameHebraw:'ניקיון תא המטען',arraow:6,jsonField:[{nameHebraw:'שלמות תא המטען',valueChackBox:[false,false],valueInput:""},
                {nameHebraw:'ניקיון תא המטען',valueChackBox:[false,false],valueInput:""},
                {nameHebraw:'גופים זרים',valueChackBox:[false,false],valueInput:""},
                {nameHebraw:'אוורור תא המטען',valueChackBox:[false,false],valueInput:""},
                {nameHebraw:'ריח חריג',valueChackBox:[false,false],valueInput:""}]},{nameHebraw:"הובלה בקירור",arraow:3,jsonField:[{nameHebraw:'טמפרטורת כיול תקינה',valueChackBox:[false,false],valueInput:""},
                {nameHebraw:'טמפרטורה בהגעה תקינה',valueChackBox:[false,false],valueInput:""}]}]},
                {type:"הדרישה",array:[]},
                {type:"סיכום מבדק",array:[]},
                {type:"פעולה מתקנת",array:[]}
        ]

        headerInputShippingForm:any=[
                {nameEnglish:"containerNumber",nameHebraw:"מספר מכולה"},
                {nameEnglish:"closingNumber",nameHebraw:"מספר סגר"},
                {nameEnglish:"cruiseNumber",nameHebraw:"הפגלה"},
                {nameEnglish:"remarks",nameHebraw:"הערות"},
                {nameEnglish:"nameOfTheExaminer",nameHebraw:"שם הבודק"},
                {nameEnglish:"role",nameHebraw:"תפקיד"},
                {nameEnglish:"signature",nameHebraw:"חתימה"}
        ]

/////////////////////////////////////////////////////////////////////////////////////////////

header_finished_product_title1:any=[
{nameEnglish:'date',nameHebraw:'תאריך'},
{nameEnglish:'nameOfBetHriza',nameHebraw:'שם בית האריזה'},
{nameEnglish:'nameController',nameHebraw:'שם המבקר'},
]

header_finished_product_general_table:any=[
{nameEnglish:"qrNumber",nameHebraw:"מס' ברקוד"},
{nameEnglish:"agriculturePlotNumber",nameHebraw:"מס' חלקה חקלאות"},
{nameEnglish:"flyCode",nameHebraw:"קוד זבוב"},
{nameEnglish:"strain",nameHebraw:"זן"},
{nameEnglish:"findings",nameHebraw:"ממצאים"},
{nameEnglish:"remarks",nameHebraw:"הערות"},
]

}