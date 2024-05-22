import { Component } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-desktop',
  standalone: false,
//   imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {
  chartOptions = {
	  animationEnabled: true,
	  exportEnabled: false,
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

	chartOptions2 = {
		animationEnabled: true,
		exportEnabled: false,
		title: {
			text: "גרף טסטים"
		},
		subtitles: [{
			text: "פרי שנארז במשך שבוע"
		}],
		data: [{
			type: "pie", //change type to column, line, area, doughnut, etc
			indexLabel: "{name}: {y}%",
			dataPoints: [
				{ name: "בררה", y: 20},
				{ name: "class 2", y: 15 },
				{ name: "calss 1", y: 35.2 },
				{ name: "שוק מקומי", y: 14 },
				{ name: "תעשיה", y: 10 }
			]
		}]
	      }
}
