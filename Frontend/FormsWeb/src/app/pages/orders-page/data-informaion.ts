import { count } from "rxjs";

export class DataInformaion{

        products:any=[
        {nameHebraw:"שוק מקומי",size:["70","75","80","85"],class:"button-green",nameSurface:"שוק"},
        {nameHebraw:"מגשים",size:["80","85","90"],class:"button-black-orange",nameSurface:'מגש'},                
        {nameHebraw:"תפזורת",size:["60","65","70"],class:"button-brown",nameSurface:"תפזורת"}];
        surfacesOrder:any={
                name_wholesalers:'',
                code_wholesalers:'',
                surfaces:[],
                isMarketing:false,
                isEdit:true,
                isSave:false,
        }
        surface:any={size:"",type:"",count:1}
}