import { Component } from '@angular/core';
import { DataInformaion } from './data-informaion';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderSurfacesComponent } from './dialog-order-surfaces/dialog-order-surfaces.component';
import { ConnectionService } from 'ng-connection-service'
interface City {
  name: string;
  code: string;
}
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
  status = 'ONLINE'; //initializing as online by default
  isConnected:any = true;
  constructor(public dialog: MatDialog,private connectionService:ConnectionService){
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if(this.isConnected){
      this.status = "ONLINE";
      } else {
      this.status = "OFFLINE"
      }
      // alert(this.status);
      });
    }
  ngOnInit() {
      this.wholesalers = [
          { name: 'ביכורי שדה', code: '202' ,isChose:false},
          { name: 'ויקטור סעאדה', code: '300' ,isChose:false},
          { name: 'ויקטורי', code: '688' ,isChose:false},
      ];
  }
  openDialog(name:any,array:any,index:any): void {
    const dialogRef = this.dialog.open(DialogOrderSurfacesComponent, {
      data:{name:name,arraySurafce:array},
      
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSurface[index].surfaces=[]
      this.dataSurface[index].countSurface=0
      for(let surface of result['arraySurface']){
        this.dataSurface[index].surfaces.push(surface)
       
      }
      this.sortSurfaces(this.generalIndexRow)
      for(let j of this.dataSurface[index].surfaces){
        this.dataSurface[index].countSurface+=j.count
      }

      this.totalSurface()
    
    });
  }
  totalSurface(){
    this.totalSurfaceInOrder=0
    for(let surface of this.dataSurface){
      this.totalSurfaceInOrder+=surface.countSurface
    }
  }
  addProdects(){  
    for(let i=0;i<this.dataSurface;i++){
      this.dataSurface[i].isEdit=false
    }
    this.dataSurface.push({nameWholesalers:'',codeWholesaler:'',surfaces:[],isMarketing:false,isEdit:true,isSave:false,indexRow:this.dataSurface.length-1,countSurface:0})
    this.generalIndexRow=0
    this.isEditRow=true
  }
  addWholesalers(name:any,index:any){
    
    this.dataSurface[index]
    this.dataSurface[index].nameWholesalers=name

    for(let i of this.wholesalers){
      if(i.name==name.name){
        i.isChose=true
      }
    }
    this.generalIndexRow=index
    this.openDialog(name,[],index)
  }
  addSizeSurfaces(size:any,type:any){
    var isFind:boolean=false
    if(this.dataSurface.length!=0){
      for(let i of this.dataSurface[this.generalIndexRow].surfaces){
        if(i.size==size && i.type==type){
          i.count+=1
          isFind=true
          break
        }
      }
      if(isFind==false)this.dataSurface[this.generalIndexRow].surfaces.push({size:size,type:type,count:1})}
    else{this.dataSurface[this.generalIndexRow].surfaces.push({size:size,type:type,count:1})}
    
  }
  sortSurfaces(index:any){
    var newArraySorting:any=[]
    for(let name of this.dataInformaion.products){
      for(let header of this.dataSurface[index].surfaces){
        if (header.type==name.nameSurface){
          newArraySorting.push(header)
        }
      }
  }
  this.dataSurface[index].surfaces=[...newArraySorting]
}
  saveWholesalers(){
    for(let i=0;i<this.dataSurface.length;i++){
      this.dataSurface[i].indexRow=i
    }
    this.dataSurface[this.generalIndexRow].isEdit=false
    this.isEditRow=false
  }
  editWholesalers(name:any,index:any){
    for(let i=0;i<this.dataSurface;i++)
      if(i!=index){
        this.dataSurface[i].isEdit=false
      }
    this.dataSurface[index].isEdit=true
    this.generalIndexRow=index
    this.isEditRow=true
   
    this.openDialog(name,this.dataSurface[index].surfaces,index)

  }
  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions|any) {
      options.filter(event);
  }
}
