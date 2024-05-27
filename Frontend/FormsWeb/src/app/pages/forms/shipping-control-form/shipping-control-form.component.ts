import { Component, OnInit } from '@angular/core';
import { headerForms } from '../headerForms';

@Component({
  selector: 'app-shipping-control-form',
  standalone: false,
  // imports: [],
  templateUrl: './shipping-control-form.component.html',
  styleUrl: './shipping-control-form.component.scss'
})
export class ShippingControlFormComponent implements OnInit {
  headersShipping:any=new headerForms()
  isActive:boolean=true
  ngOnInit(): void {
    console.log(this.headersShipping)
  }
 
}
