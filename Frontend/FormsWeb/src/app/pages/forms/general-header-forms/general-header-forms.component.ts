import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-general-header-forms',
  standalone: false,
  templateUrl: './general-header-forms.component.html',
  styleUrl: './general-header-forms.component.scss'
})
export class GeneralHeaderFormsComponent {
  @Input() procedureNumber:any
  @Input() nameForm:any
  @Input() edition:any
  @Input() formDate:any
  @Input() pageNo:any
  @Input() effectiveDate:any
}
