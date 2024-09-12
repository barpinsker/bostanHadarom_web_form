export class HeaderButtonQuality{
   headerButtons:Array<any>=[
      {nameEnglish:"summary",nameHebraw:"סיכום",arrayHeaderType:[
         {nameHebrew:'סה"כ לא תקינים',nameEnglish:"totallyNotNormal"},
         {nameHebrew:'סה"כ פסולים',nameEnglish:"totallyInvalid"},
         {nameHebrew:'מספר בדיקה',nameEnglish:"reference_test"},
         {nameHebrew:'תאריך בדיקה',nameEnglish:"date_test"},
         {nameHebrew:'שעת בדיקה',nameEnglish:"time_test"},
         {nameHebrew:'סוג פרי',nameEnglish:"fruit"},
         {nameHebrew:'מנה',nameEnglish:"dose"},
         // {nameHebrew:"הערות",nameEnglish:"remarks"},
       ],type:"end"},
      {nameEnglish:"form",nameHebraw:"טופס",arrayHeaderType:[
        {nameHebrew:"סוג אריזה",nameEnglish:"packagingType",type:'select'},
        {nameHebrew:"גודל",nameEnglish:"size",type:'select'},
        {nameHebrew:"סהכ יחידות",nameEnglish:"totalUnits",type:'select'},
        {nameHebrew:"משקל אריזה",nameEnglish:"packingWeight",type:'select'},
        {nameHebrew:"סימון קרטון",nameEnglish:"cardboardMarking",type:'select'},
        {nameHebrew:"משקל יחידה",nameEnglish:"unitWeight",type:'select'},
        {nameHebrew:"חריגי משקל",nameEnglish:"weightAbnormalities",type:'input'}]
      ,type:"start"},
      {nameEnglish:"harvest",nameHebraw:"קטיף",arrayHeaderType:[
        {nameHebrew:"מכות קטיף",nameEnglish:"bruzes"},
        {nameHebrew:"דקירות/פציעות",nameEnglish:"StabsOrinjuries"},
        {nameHebrew:"עוקץ",nameEnglish:"sting"}],type:"mid"},
  
      {nameEnglish:"pestsAndDiseases",nameHebraw:"מזיקים ומחלות",arrayHeaderType:[
        {nameHebrew:"זבוב",nameEnglish:"fly"},
        {nameHebrew:"אלטנריה",nameEnglish:"alternaria"},
        {nameHebrew:"טריפס",nameEnglish:"Thrips"},
        {nameHebrew:"סימני מחלה",nameEnglish:"signsOfIllness"},
        {nameHebrew:"מזיקים",nameEnglish:"harmful"}],type:"mid"},
  
      {nameEnglish:"array",nameHebraw:"מערך",arrayHeaderType:[
        {nameHebrew:"כללי",nameEnglish:"general"},
        {nameHebrew:"לכלוך",nameEnglish:"dirt"},
        {nameHebrew:"מכני",nameEnglish:"mechanical"},
      ],type:"mid"},
  
      {nameEnglish:"general",nameHebraw:"כללי",arrayHeaderType:[
        {nameHebrew:"פרי רך/גמיש",nameEnglish:"softOrFlexibleFruit"},
        {nameHebrew:"מעוותים",nameEnglish:"twisted"},
        {nameHebrew:"שיפשופים/שריטות",nameEnglish:"abrasionsOrScratches"},
        {nameHebrew:"מכות שמש",nameEnglish:"sunstroke"},
        {nameHebrew:"השחרה פנימית",nameEnglish:"InternalBlackening"},
        {nameHebrew:"כתמים שחורים",nameEnglish:"blackSpots"},
      ],type:"mid"},
   ]  
      arraySelect:any={'טריומף':{
      packagingType:[{nameHebraw:'803 ( 30/33 ) טרייפק',value:["10",'12','14','16','18',"20","22","24","26"]},
      {nameHebraw:'806/801/802 ( 30/25 ) לוס',value:["10",'12','14','16','18',"20","22","24","26"]},
      {nameHebraw:'קוסקו',value:["8","(0.900) 8","10"]},
      {nameHebraw:"סלסלות קג 1",value:["8","9","10","11","12","14"]},
      {nameHebraw:"סלסלות קג 0.900",value:["8","9","10","11","12","14"]},
      {nameHebraw:"סלסלות קג 0.500",value:["8","9","10","11","12","14"]},
      {nameHebraw:'שוק מקומי',value:["60","65","70","75"]},
      {nameHebraw:'ארגזי פלסטיק',value:["60","65","70","75"]},
      {nameHebraw:'תפזורת',value:["00"]}],
      size:[],
      totalUnits:[],  
      packingWeight:[{nameHebraw:'תקין'},{nameHebraw:'לא תקין'}],
      cardboardMarking:[{nameHebraw:'תקין'},{nameHebraw:'לא תקין'}],
      unitWeight:[{nameHebraw:'תקין'},{nameHebraw:'לא תקין'}],
    },
    'אורי':{packagingType:[
      {nameHebraw:'קרטון ירוק לבן (8648 , 893)',value:['Cal - 1','Cal - 1x','Cal - 2x','Cal - 3x']},
      {nameHebraw:'קרטון שחור מבריק 12.5 ק"ג (8652 , 887)',value:['Cal - 1','Cal - 2','Cal - 1x','Cal - 2x','Cal - 3x']},
      {nameHebraw:'קרטון שחור מבריק 7 ק"ג (8648 , 893)',value:['Cal - 1','Cal - 1x','Cal - 2x','Cal - 3x']},
      {nameHebraw:'קרטון ירוק קלאס 2 (8658 , 907)',value:['Cal - 1','Cal - 1x','Cal - 2x','Cal - 3x']},
      {nameHebraw:'קרטון חום כתום (8652 , 882)',value:['30','20']},
      {nameHebraw:'תפזורת',value:["מיכל"]}]},
      size:[],
      totalUnits:[
      {nameHebraw:'קרטון ירוק לבן (8648 , 893)',value:['60','50','40','35']},
      {nameHebraw:'קרטון שחור מבריק 12.5 ק"ג (8652 , 887)',value:['100','119','81','70','35']},
      {nameHebraw:'קרטון שחור מבריק 7 ק"ג (8648 , 893)',value:['60','50','40','35']},
      {nameHebraw:'קרטון ירוק קלאס 2 (8658 , 907)',value:['60','50','40','35']},
      {nameHebraw:'קרטון חום כתום (8652 , 882)',value:['150','200']},
      {nameHebraw:'תפזורת',value:["מיכל"]}],
      packingWeight:[{nameHebraw:'תקין'},{nameHebraw:'לא תקין'}],
      cardboardMarking:[{nameHebraw:'תקין'},{nameHebraw:'לא תקין'}],
      unitWeight:[{nameHebraw:'תקין'},{nameHebraw:'לא תקין'}],}
  }
    
    //   packagingType:any=[];
    //   sizeSelect:any=[];
    //   totalUnits:any=[
      
    // ];
    // jsonSelectHeadersMandarins:any=[
    //     {nameHebraw:'קרטון ירוק לבן (8648 , 893)',value:['Cal - 1','Cal - 1x','Cal - 2x','Cal - 3x']},
    //     {nameHebraw:'קרטון שחור מבריק 12.5 ק"ג (8652 , 887)',value:['Cal - 1','Cal - 2','Cal - 1x','Cal - 2x','Cal - 3x']},
    //     {nameHebraw:'קרטון שחור מבריק 7 ק"ג (8648 , 893)',value:['Cal - 1','Cal - 1x','Cal - 2x','Cal - 3x']},
    //     {nameHebraw:'קרטון ירוק קלאס 2 (8658 , 907)',value:['Cal - 1','Cal - 1x','Cal - 2x','Cal - 3x']},
    //     {nameHebraw:'קרטון חום כתום (8652 , 882)',value:['30','20']},
    //     {nameHebraw:'תפזורת',value:["מיכל"]}]
    //     jsonAmountHeadersMandarins:any=[
    //     {nameHebraw:'קרטון ירוק לבן (8648 , 893)',value:['60','50','40','35']},
    //     {nameHebraw:'קרטון שחור מבריק 12.5 ק"ג (8652 , 887)',value:['100','119','81','70','35']},
    //     {nameHebraw:'קרטון שחור מבריק 7 ק"ג (8648 , 893)',value:['60','50','40','35']},
    //     {nameHebraw:'קרטון ירוק קלאס 2 (8658 , 907)',value:['60','50','40','35']},
    //     {nameHebraw:'קרטון חום כתום (8652 , 882)',value:['150','200']},
    //     {nameHebraw:'תפזורת',value:["מיכל"]}]
    //   packingWeightSelect:any=['תקין','לא תקין'];
    //   cardboardMarkingSelect:any=['תקין','לא תקין'];
    //   unitWeightSelect:any=['תקין','לא תקין'];
    //   weightAbnormalities:any=['יש','אין'];
// }