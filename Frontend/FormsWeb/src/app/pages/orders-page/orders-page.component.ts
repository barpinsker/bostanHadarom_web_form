import { Component } from '@angular/core';
import { DataInformaion } from './data-informaion';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderSurfacesComponent } from './dialog-order-surfaces/dialog-order-surfaces.component';
import { ConnectionService } from 'ng-connection-service'
import { Router } from '@angular/router';
import { RestApiService } from '$src/app/services/rest-api.service';
import { Subscription,fromEvent,map,merge, of } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  standalone: false,
  // imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {
  dataInformaion:any=new DataInformaion();
  wholesalers: any=[];
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
  constructor(public dialog: MatDialog,private connectionService:ConnectionService,private Route:Router,private restApi:RestApiService){
   
    }
  ngOnInit() {
      this.wholesalers = [
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
        this.sortSurfaces(0)
      })
  }

  changeDate(){
    var newDate:any=document.querySelector("#selectDate")
    if(newDate!=null){
      // this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].isEditRow=true
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
  isEditRowChange(index:any){
    for(let i of this.dataSurface){
      i.isRowEdit=false
    }
    this.dataSurface[index].isRowEdit=true
    this.dayDate=this.dataSurface[index].date_order
    this.dateToCheck=this.dayDate
    this.isSaveOrder=true
  }
  saveDataDataBase(){
 
    const isLargeNumber = (element:any) => element.date_order == this.dayDate
    console.log( this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow])
    // if(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isNew']==true){
    //   this.restApi.saveDataOrder({'data_order':this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]}).subscribe(dataOrder=>{
    this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isRowEdit']=false
    this.dayDate=formatDate(new Date(),'DD-mm-yyyy','en')
    //     this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isSave']=true
    //     this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isNew']=true
    //   })
    // }
    // else{  
    //   this.restApi.updateOrder({data_order:this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]},`${this.dayDate}`).subscribe(dataOrder=>{
    //     this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isRowEdit']=false
    //     this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isSave']=true
    //     this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isNew']=false
    //   })
    // }
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
    this.dataSurface.unshift({date_order:this.dayDate,array:[{name_wholesalers:'',code_wholesalers:'',surfaces:[],isMarketing:false,isEdit:true,isSave:false,indexRow:this.dataSurface.length-1,countSurface:0}],isRowEdit:true,total_surface:0,isNew:true})
    }
    else{
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array.push({name_wholesalers:'',code_wholesalers:'',surfaces:[],isMarketing:false,isEdit:true,isSave:false,indexRow:this.dataSurface.length-1,countSurface:0})
    }
    this.generalIndexRow=0
    this.isEditRow=true
  }
  addWholesalers(name:any,index:any){
    if(name.isChose==false){
      const isLargeNumber = (element:any) => element.date_order == this.dayDate;
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].name_wholesalers=name.name
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].code_wholesalers=name.code
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[index].isChose=true
      for(let i of this.wholesalers){
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
  saveWholesalers(){
    const isLargeNumber = (element:any) => element.date_order == this.dayDate;
    for(let i=0;i<this.dataSurface.length;i++){
      this.dataSurface[i].indexRow=i
    }
    // print test
    console.log(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow])
    var jsonSave:any={'array':this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array}
    localStorage.setItem(this.dayDate,JSON.stringify(jsonSave))
    if(! Object.keys(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]).includes("status")){
      this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow].status='new'
    }
    this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow].isEdit=false
    if(Object.keys(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]).includes("status")){ 
      if(this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow]['status']=='new'){
        this.restApi.saveDataOrder({'data_order':this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]}).subscribe(dataOrder=>{
          // this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isRowEdit']=false
          this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isSave']=true
          this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isNew']=false
          this.isEditRow=false
        })
      }
      else{  
        this.restApi.updateOrder({data_order:this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].array[this.generalIndexRow],'total_surface':this.dataSurface[this.dataSurface.findIndex(isLargeNumber)].total_surface},`${this.dayDate}`).subscribe(dataOrder=>{
          // this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isRowEdit']=false
          // this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isSave']=true
          // this.dataSurface[this.dataSurface.findIndex(isLargeNumber)]['isNew']=false
        })
      }
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
  moveQrPage(){
    this.Route.navigate(['qr-page-order'])
  }
}
