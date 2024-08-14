import { Component, OnInit } from '@angular/core';
import { DataInformaion } from '../data-informaion';

@Component({
  selector: 'app-qr-page-order',
  standalone: false,
  templateUrl: './qr-page-order.component.html',
  styleUrl: './qr-page-order.component.scss'
})
export class QrPageOrderComponent implements OnInit {
  dataInformaion:any=new DataInformaion();
  dataQr:any=[
    {nameWholesalers:'בר פינסקר 1804',surfaces:[{size:"80",type:"שוק",numberSurface:""},{size:"80",type:"שוק",numberSurface:""},{size:"70",type:"שוק",numberSurface:""},{size:"75",type:"שוק",numberSurface:""},{size:"60",type:"שוק",numberSurface:""}],amountSurface:5},
    {nameWholesalers:'הילה אהוד 1712',surfaces:[{size:"80",type:"שוק",numberSurface:""},{size:"85",type:"שוק",numberSurface:""},{size:"60",type:"שוק",numberSurface:""},],amountSurface:3},
    {nameWholesalers:'בר פינסקר 1804',surfaces:[{size:"80",type:"שוק",numberSurface:""}],amountSurface:1},
    {nameWholesalers:'בר פינסקר 1804',surfaces:[{size:"80",type:"שוק",numberSurface:""},{size:"80",type:"שוק",numberSurface:""},],amountSurface:2},
  ]
  ngOnInit(): void {
  

  }
}
