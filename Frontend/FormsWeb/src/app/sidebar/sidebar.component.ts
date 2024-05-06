import { Component, OnInit, ViewChild ,Renderer2} from '@angular/core';
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
{namePage:'דף הבית',route:"",icon:"home",active:false,dropDown:false},
{namePage:'הזמנות',route:"",icon:"orders",active:false,dropDown:false},
{namePage:'טבאלות',route:"",icon:"table",active:false,dropDown:true,childern:[
  {namePage:'סטים',route:"",icon:"table"},
  {namePage:'טפסי איכות',route:"",icon:"table"},
  {namePage:'טפסי בקרה',route:"",icon:"table"},{namePage:'חומרי חיטוי',route:"",icon:"table"}]},
{namePage:'טפסים',route:"",icon:"description",active:false,dropDown:false},
{namePage:'הגדרות',route:"",icon:"settings",active:false,dropDown:false},
  ]

  isOpenMenu:boolean=false
  panelOpenState:any = false;
  constructor() {
  }
  ngOnInit(): void {
    
  }
  openAccordion(){
  var openMenu:any=document.querySelector("#sideBar")
  var footerItem:any=document.querySelector('#footer-item-id')
  var aside:any=document.querySelector("aside")
  
  this.isOpenMenu=!this.isOpenMenu
    if(this.isOpenMenu==true){
    openMenu.style.width='200px'
    footerItem.style.opacity='1'
    aside.style.backgroundColor='rgb(0,0,0,0.5)'
    }
    else{
      footerItem.style.opacity='0'
      openMenu.style.width='0px'
      aside.style.backgroundColor='transparent'
    }
    // }
   
  }
  
}
// document.onclick= function(e){
//   var buttonMenu:any=document.querySelector("#buttonMenu")
//   var openMenu:any=document.querySelector("#sideBar")
//   var footerItem:any=document.querySelector('#footer-item-id')
//   var aside:any=document.querySelector("aside")
//   if(buttonMenu.contains(e.target) && openMenu.contains(e.target)){
  
//   footerItem.style.opacity='0'
//   openMenu.style.width='0px'
//   aside.style.backgroundColor='transparent'
//   }
// }

