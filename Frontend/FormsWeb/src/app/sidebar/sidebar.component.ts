import { Component, OnInit, ViewChild ,Renderer2, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { RestApiService } from '../services/rest-api.service';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  // imports: [SidebarModule,ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
links:Array<any>=[
{namePage:'דף הבית',route:"desktop",icon:"home",active:false,dropDown:false},
{namePage:'הזמנות',route:"orders",icon:"orders",active:false,dropDown:false},
// table-of-procedures
{namePage:'טבאלות',route:"",icon:"table",active:false,dropDown:true,childern:[
  {namePage:'סטים',route:"",icon:"table"},
  {namePage:'טפסי בקרה',route:"/control-table",icon:"table"},
  {namePage:'טפסי איכות',route:"/table-quality-forms",icon:"table"},
  {namePage:'טבלת תקנים',route:"/table-of-standards",icon:"table"},
  {namePage:'חומרי חיטוי',route:"/disinfectants-of-table",icon:"table"}
]},
{namePage:"מגדלים",route:"/grower-page",icon:"group",active:false,dropDown:false},
{namePage:"תעודות כניסה",router:"/certificates-page",icon:"library_books",active:false,dropDown:false},
{namePage:'טפסים',icon:"description",active:false,dropDown:false,array:[
  {nameForm:"טופס בקרת שילוח",route:'/form-delivery-control',},
  {nameForm:"טופס בקרת איכות",route:'/form-delivery-control'},
  {nameForm:"טופס מוצר מוגמר",route:'/form-delivery-control'},
  {nameForm:"טופס קנט",route:'/kant-form'},
  {nameForm:"טופס עמדת קנט",route:'/form-delivery-control'},]},
{namePage:'הגדרות',route:"settings-page",icon:"settings",active:false,dropDown:false},
  ]
  screenHeight:any
  screenWidth:any
  isOpenMenu:boolean=false;
  panelOpenState:any = false;
  dropLeft:boolean=false
  menuFormOpen:any;
  urlPath:any=window.location.pathname;
  constructor(private restApi:RestApiService) {
  }
  ngOnInit(): void {
  
    this.onResize()
  }
  filterData($event:any){}
  changeLoclaStoreg(){

  }
  changePoiotnMenuCustom(){
    this.isOpenMenu=!this.isOpenMenu
  }
  openAccordion(){
  var openMenu:any=document.querySelector("#sideBar")
  var asideBar:any=document.querySelector('aside')
  
  this.isOpenMenu=!this.isOpenMenu
    if(this.isOpenMenu==true){
    openMenu.style.transform="translateX(0)";
    asideBar.style.backgroundColor="rgba(0,0,0,0.5)";
    asideBar.style.zIndex='10'
    }
    else{
      openMenu.style.transform="translateX(100%)";
      openMenu.style.transition="all ease-in-out .3s";
     
      
      setTimeout(function () {
      
        if(asideBar!=undefined)
        asideBar.style.backgroundColor="transparent";
        
        asideBar.style.zIndex='0'
      
    }, 300);
    }
    // }
   
  }
  openDropDown(item:any){
    // item=!item
    var asideBarScroll:any=document.querySelector('.body-sidebar-scroll')
    if(item==true){
    if(asideBarScroll!=null)
    if(this.screenHeight<600){
    asideBarScroll.style.maxHeight='81.5%';
    asideBarScroll.style.overflowY='auto'
      }
    else{
      asideBarScroll.style.maxHeight='100%';
      asideBarScroll.style.overflowY='hidden';
    }
    
    }
    else{
      asideBarScroll.style.overflowY='hidden';
    }
  }
  // 
  openDropLeft(){
    var drop_Left:any=document.querySelector('#dropleft')
    var asideBar:any=document.querySelector('.sidebar-rigth')
    this.dropLeft=!this.dropLeft
    if(this.dropLeft==true){
    if(drop_Left!=null){
    drop_Left.style.transform="translateX(-200px)";
    drop_Left.style.transition="all ease-in-out .5s";
    drop_Left.style.zIndex='2'
    if(asideBar!=null)
    asideBar.style.borderRadius='0px 0px 0px 0px'
    }
    this.restApi.getISHelfForm().subscribe(data=>{
      this.moveForm(data['forms'])
    },error=>{
      this.moveForm([])
    })
    }
    else{
      var drop_Left:any=document.querySelector('#dropleft')
      if(drop_Left!=null){
      drop_Left.style.transform="translateX(200px)";
      drop_Left.style.transition="all ease-in-out .5s";
      drop_Left.style.zIndex='0'
      asideBar.style.borderRadius='0px 0px 0px 15px'
    }
    }
 
    
  }

  moveForm(forms:any){
    this.links[5].array.map((form:any)=>{
       if(form.nameForm==='טופס קנט')
            form.route=form.route+`;workerOrVisitor=workerValues`
      forms.map((data:any)=>{
        if(form.nameForm==data.name_form){
          if(form.nameForm==='טופס קנט')
            form.route=form.route+`;reference=${data.reference};workerOrVisitor='workerOrVisitor'`
          else{
            form.route=form.route+`;reference=${data.reference}`
          }
          form['status_form']='חלקי'
        }else{
          console.log(form)
         
          form['status_form']=''
        }
      })
    })
   
  }

  @HostListener('window:resize', ['$event'])
onResize(event?:any
) {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
}
}

  
  // if(buttonMenu.contains(e.target) && openMenu.contains(e.target)){
  
  // footerItem.style.opacity='0'
  // openMenu.style.width='0px'
  // aside.style.backgroundColor='transparent'
  // }
