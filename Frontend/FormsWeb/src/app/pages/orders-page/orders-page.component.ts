import { Component } from '@angular/core';
import { DataInformaion } from './data-informaion';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderSurfacesComponent } from './dialog-order-surfaces/dialog-order-surfaces.component';
import { ConnectionService } from 'ng-connection-service'
import { Router } from '@angular/router';
import { RestApiService } from '$src/app/services/rest-api.service';
import { Subscription,find,fromEvent,map,merge, of } from 'rxjs';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  // imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {
  dataInformaion:any=new DataInformaion();
  wholesalersAfter: any=[];
  wholesalersBefor: any=[];
  dataSurface:any=[];
  myOptions = {
    'placement': 'left',
    'showDelay': 500
  }
  fliterName:string='name';
  isEditRow:boolean=false;
  nameWholesalersFilter:string='';
  codeWholesalersFilter:string='';
  nameWholesalers:any='';
  surfacesOrder:any={};
  surface:any={};
  classTypeColor:any={"מגש":"button-black-orange",'שוק':'button-green','תפזורת':'button-brown'}
  generalIndexRow:number=0
  totalSurfaceInOrder:number=0
  status:boolean=false; //initializing as online by default
  networkStatus: boolean = false;
  dayDate:any=''
  dateToCheck:any=''
  datesSelect:any=[]
  isSaveOrder:boolean=false
  networkStatus$: Subscription = Subscription.EMPTY;
  constructor(public dialog: MatDialog,private connectionService:ConnectionService,private Route:Router,private restApi:RestApiService,private toast:ToastrService){
   
    }
  ngOnInit() {
      this.wholesalersAfter = [
          { name: 'ביכורי שדה', code: '202' ,isChose:false},
          { name: 'ויקטור סעאדה', code: '300' ,isChose:false},
          { name: 'ויקטורי', code: '688' ,isChose:false},
      ];
      
       
      this.dayDate=formatDate(new Date(),'dd-MM-yyyy','en').toString()
      this.dateToCheck=this.dayDate
      var dateDay:any=new Date()
      var minusOneDay:any=dateDay.setDate(dateDay.getDate() - 1);
      var minusTowDay:any=dateDay.setDate(dateDay.getDate() - 1);
      var day:any=new Date()
      var pluseOneDay:any=day.setDate(day.getDate() +1);
      var pluseTowDay:any=day.setDate(day.getDate() +1);
      this.datesSelect=[formatDate(minusTowDay,'dd-MM-yyyy','en'),formatDate(minusOneDay,'dd-MM-yyyy','en'),formatDate(new Date(),'dd-MM-yyyy','en'),formatDate(pluseOneDay,'dd-MM-yyyy','en'),formatDate(pluseTowDay,'dd-MM-yyyy','en')]
      this.restApi.getAllOrder().subscribe(data=>{
        this.dataSurface=[...data['data']]
        const isRowEditIndex = (element:any) => element.isRowEdit == true
        if(this.dataSurface[this.dataSurface.findIndex(isRowEditIndex)]!=undefined)
          this.getAllWholesalerByOrder(this.dataSurface[this.dataSurface.findIndex(isRowEditIndex)].reference)
        this.sortSurfaces(0)
      })
  }
  getAllWholesalerByOrder(reference:any):any{
    // this.dataSurface[this.dataSurface.findIndex(isRowEditIndex)].reference
    this.restApi.getWholesalerToOrder(`${reference}`).subscribe(data=>{
      this.wholesalersAfter=[...data['data_wholesaler']]
    })
  }
  getAllWholesaler(){
    this.restApi.insertWholesaler('').subscribe(data=>{
      this.wholesalersAfter=[...data['data']]
      this.wholesalersBefor=[...data['data']]
      const isDateIndexDay = (element:any) => element.date_order == this.dayDate
      for(let wh of this.wholesalersAfter){
        wh['isChose']=false
      }
      for(let wh of this.wholesalersBefor){
        wh['isChose']=false
      }
      
    })
  }
  changeDate(){
    var newDate:any=document.querySelector("#selectDate")
    if(newDate!=null){
      for(let i of this.dataSurface){
        if(i.date_order==newDate.value){
          i.isRowEdit=true
        }
      }
      this.dayDate=newDate.value
      this.dateToCheck=newDate.value
      this.addProdects()
    }

  }
  openDialog(name:any,array:any,index:any): void {
    const isLargeNumber = (element:any) => element.date_order == this.dayDate
    const dialogRef = this.dialog.open(DialogOrderSurfacesComponent, {
      data:{name:name,arraySurafce:array},
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].surfaces=[]
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].countSurface=0
      for(let surface of result['arraySurface']){
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].surfaces.push(surface)
      }
      this.sortSurfaces(this.generalIndexRow)
      for(let j of  this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].surfaces){
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].countSurface+=j.count
      }
      this.generalIndexRow=index
      this.isSaveOrder=true
      this.totalSurface()
    });
}

  totalSurface(){
    const isLargeNumber = (element:any) => element.date_order == this.dayDate
    this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].total_surface=0
    for(let surface of this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array){
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].total_surface+=surface.countSurface
    }
  }
  saveDataLocalStorage(){
    console.log('save localStoreg')
  }
  isEditRowChange(index:any,reference:any){
    for(let i of this.dataSurface){
      i.isRowEdit=false
    }
    this.dataSurface[index].isRowEdit=true
    this.getAllWholesalerByOrder(this.dataSurface[index].reference)
    this.dayDate=this.dataSurface[index].date_order
    this.dateToCheck=this.dayDate
    this.isSaveOrder=true
  }
  saveDataDataBase(){
    const isLargeNumber = (element:any) => element.date_order == this.dayDate
    this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isRowEdit']=false
    this.dayDate=formatDate(new Date(),'DD-mm-yyyy','en')
  }
  connectionNetwork(){
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        this.networkStatus = status;
        
      });
    
    return this.networkStatus
  }
  addProdects(){ 
    
    for(let i=0;i<this.dataSurface;i++){
      this.dataSurface[i].isEdit=false
    }
    
    const isLargeNumber:any = (element:any) => element.date_order == this.dayDate;
    console.log(this.dataSurface.findIndex(isLargeNumber))
    if(this.dataSurface.findIndex(isLargeNumber)==-1){
    this.dataSurface.unshift({date_order:this.dayDate,array:[{name:'',code:'',surfaces:[],isMarketing:false,isEdit:true,isSave:false,indexRow:this.dataSurface.length-1,countSurface:0}],isRowEdit:true,total_surface:0,isNew:true})
    }
    else{
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array.push({name:'',code:'',surfaces:[],isMarketing:false,isEdit:true,isSave:false,indexRow:this.dataSurface.length-1,countSurface:0})
    }
    this.generalIndexRow=0
    this.isEditRow=true
  }
  addWholesalers(name:any,index:any){
    if(name.isChose==false){
      const isLargeNumber = (element:any) => element.date_order == this.dayDate;

    
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].name=name.name
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].code=name.code
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].isChose=true
      for(let i of this.wholesalersAfter){
        if(i.name==name.name){
          i.isChose=true
        }
      }
    }
    this.generalIndexRow=index

    this.openDialog(name.code+' - '+name.name,[],index)
  }
  addSizeSurfaces(size:any,type:any){
    const isLargeNumber = (element:any) => element.date_order == this.dayDate;
    var isFind:boolean=false
    if(this.dataSurface.length!=0){
      for(let i of this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow].surfaces){
        if(i.size==size && i.type==type){
          i.count+=1
          isFind=true
          break
        }
      }
      if(isFind==false)this.dataSurface[this.generalIndexRow].surfaces.push({size:size,type:type,count:1})}
    else{this.dataSurface[this.generalIndexRow].surfaces.push({size:size,type:type,count:1})}
    
  }
  sortSurfaces(data:any){
    var header_type:Array<string>=['שוק','מגש','תפזורת']
    var newArraySorting:any=[]
    this.dataSurface.map((order:Object|any,index:any)=>{
      order.array.map((surface:any,index:any)=>{
        newArraySorting=[]
        for(let header of header_type){
        surface.surfaces.map((surf:any)=>{
            if(surf.type==header){
              newArraySorting.push(surf)
            }
          })
        }
        surface.surfaces=[...newArraySorting]
      })
    })
  }
  fix_name_details_order(details:any){
    var json_details=details.name
    details.name=json_details.name
    details.code=json_details.code
    return details

  }
  saveWholesalers(index:any){
    const isLargeNumber = (element:any) => element.date_order == this.dayDate;
    this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]=this.fix_name_details_order(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow])
    for(let i=0;i<this.dataSurface.length;i++){
      this.dataSurface[i].indexRow=i
    }
    if(! Object.keys(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]).includes("status")){
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow].status='new'
    }
    this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow].isEdit=false 
    if(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]['status']=='new'){
      this.restApi.saveDataOrder({'data_order':this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]}).subscribe(dataOrder=>{
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isSave']=true
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isNew']=false
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]['status']='old'
        this.isEditRow=false
        this.isSaveOrder=true
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['reference']=dataOrder['reference']
        const isChoseName=(element:any) => element.name=this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index]['name']
        this.wholesalersAfter.splice(this.wholesalersAfter.findIndex(isChoseName),1)
        this.toast.success("הזמנה נוצרה בהצלחה",'Order Message')
      },error=>{
        this.toast.error("יש בעיה ביצירת ההזמנה",'Order Message')
      })
    }
    else{  
      this.restApi.updateOrder({data_order:this.dataSurface[this.dataSurface.findIndex(isLargeNumber)],data_details:this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index],'total_surface':this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].total_surface},`${this.dayDate}`).subscribe(dataOrder=>{
        this.toast.success("עדכון ההזמנה בוצע בהצלחה",'Order Message')
      },error=>{
        this.toast.error("יש בעיה בעדכון ההזמנה",'Order Message')
      })
    }
  }
  editWholesalers(name:any,index:any){
    const isLargeNumber = (element:any) => element.date_order == this.dayDate;
    for(let i=0;i<this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array;i++)
      if(i!=index){
        this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[i].isEdit=false
      }
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].isEdit=true
    this.generalIndexRow=index
    this.isEditRow=true
    this.openDialog(name,this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].surfaces,index)

  }
  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions|any) {
      options.filter(event);
  }
  moveQrPage(referenceOrder:any){
    this.Route.navigate(['qr-page-order/',{reference:referenceOrder}])
  }
}
