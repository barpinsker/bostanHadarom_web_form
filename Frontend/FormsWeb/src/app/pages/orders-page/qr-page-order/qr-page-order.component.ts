import { Component, OnInit } from '@angular/core';
import { DataInformaion } from '../data-informaion';
import { RestApiService } from '$src/app/services/rest-api.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  constructor(private restApi:RestApiService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.restApi.getSpecificeOrder(`${params['reference']}`).subscribe(data=>{
        this.dataQr=data
      })
    })

  }
  
}
