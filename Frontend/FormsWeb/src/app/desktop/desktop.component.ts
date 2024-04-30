import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CanvasJSAngularChartsModule,MatCardModule],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {
  chartOptions = {
	  animationEnabled: true,
	  exportEnabled: true,
	  title: {
		  text: "גרף טפסים"
	  },
	  subtitles: [{
		  text: "טפסים שנוצרו ביום או בשבוע"
	  }],
	  data: [{
		  type: "pie", //change type to column, line, area, doughnut, etc
		  indexLabel: "{name}: {y}%",
		  dataPoints: [
		  	{ name: "Overhead", y: 80},
		  	{ name: "Problem Solving", y: 5 },
		  	{ name: "Debugging", y: 4.8 },
		  	{ name: "Writing Code", y: 0.2 },
		  	{ name: "Firefighting", y: 10 }
		  ]
	  }]
	}
}
