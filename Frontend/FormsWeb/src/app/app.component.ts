import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet,BrowserAnimationsModule,BrowserModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  title = 'FormsWeb';
  currentUrl:any = window.location.href.split("/");
  ngOnInit(): void {

    this.currentUrl=this.currentUrl[window.location.href.split("/").length-1]
    console.log(this.currentUrl)
  }
}
