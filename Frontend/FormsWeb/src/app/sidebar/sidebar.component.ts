import { Component, OnInit, ViewChild ,Renderer2, Input, Output, EventEmitter} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Sidebar } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
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
{namePage:'טבאלות',route:"",icon:"table",active:false,dropDown:true,childern:[
  {namePage:'סטים',route:"",icon:"table"},
  {namePage:'טפסי איכות',route:"",icon:"table"},
  {namePage:'טפסי בקרה',route:"",icon:"table"},{namePage:'חומרי חיטוי',route:"",icon:"table"}]},
{namePage:"מגדלים",router:"/grower-page",icon:"group",active:false,dropDown:false},
{namePage:"תעודות כניסה",router:"/certificates-page",icon:"library_books",active:false,dropDown:false},
{namePage:'טפסים',route:"",icon:"description",active:false,dropDown:false},
{namePage:'הגדרות',route:"",icon:"settings",active:false,dropDown:false},
  ]
  isOpenMenu:boolean=false;
  panelOpenState:any = false;
  menuFormOpen:any;
  urlPath:any=window.location.pathname;
  constructor() {
  }
  ngOnInit(): void {
  
  
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
    // openMenu.style.width='200px'
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
 
  toMoiveCreateFrom(){

  }
}

  
  // if(buttonMenu.contains(e.target) && openMenu.contains(e.target)){
  
  // footerItem.style.opacity='0'
  // openMenu.style.width='0px'
  // aside.style.backgroundColor='transparent'
  // }
