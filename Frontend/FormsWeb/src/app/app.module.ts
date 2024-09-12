import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SliderModule } from 'primeng/slider';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { StyleClassModule } from 'primeng/styleclass';
import { FilterMatchMode, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { PrimeNGConfig } from 'primeng/api';
// import { TooltipModule } from 'primeng/tooltip';
import { PanelMenuModule } from 'primeng/panelmenu';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AppRoutingModule } from './app.routes';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {MatIconModule} from '@angular/material/icon';
// import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOrderSurfacesComponent } from './pages/orders-page/dialog-order-surfaces/dialog-order-surfaces.component';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TableOfStandards } from './pages/table-of-standards/table-of-standards.component';
import { DialogRowStandardComponent } from './pages/table-of-standards/dialog-row-standard/dialog-row-standard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { GeneralTableComponent } from './pages/settings-page/general-table/general-table.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { DialogRowDataGeneralComponent } from './pages/settings-page/dialog-row-data-general/dialog-row-data-general.component';
import { TableQualityFormsComponent } from './pages/table-quality-forms/table-quality-forms.component';
import { DisinfectantsOfTableComponent } from './pages/disinfectants-of-table/disinfectants-of-table.component';
import { ToastrModule } from 'ngx-toastr';
import {MatListModule} from '@angular/material/list';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { QrPageOrderComponent } from './pages/orders-page/qr-page-order/qr-page-order.component';
import { QRCodeModule } from 'angularx-qrcode';
import { GeneralHeaderFormsComponent } from './pages/forms/general-header-forms/general-header-forms.component';
import { FormDeliveryControlComponent } from './pages/forms/form-delivery-control/form-delivery-control.component';
import { ControlTableComponent } from './pages/control-table/control-table.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { KanatFormComponent } from './pages/forms/kanat-form/kanat-form.component';
import { QualityTableComponent } from './pages/quality-table/quality-table.component';
import { QualityFormComponent } from './pages/forms/quality-form/quality-form.component';

// const MyDefaultTooltipOptions: TooltipOptions = {
//   'placement':'bottom',
//   'show-delay': 200,
//   'trigger':"click"
// }
@NgModule({
  declarations: [
  AppComponent,
  SidebarComponent,
  OrdersPageComponent,
  DialogOrderSurfacesComponent,
  DesktopComponent,
  TableOfStandards,
  DialogRowStandardComponent,
  GeneralTableComponent,
  SettingsPageComponent,
  DialogRowDataGeneralComponent,
  TableQualityFormsComponent,
  DisinfectantsOfTableComponent,
  QrPageOrderComponent,GeneralHeaderFormsComponent,FormDeliveryControlComponent,ControlTableComponent,KanatFormComponent,QualityTableComponent,QualityFormComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    TabMenuModule,
    HttpClientModule,
    StyleClassModule,
    SliderModule,
    MatButtonModule,
    CascadeSelectModule,
    DividerModule,
    TieredMenuModule,
    PanelMenuModule,
    MatExpansionModule,
    CdkAccordionModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    MatListModule,
    AutocompleteLibModule,
    // TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CanvasJSAngularChartsModule,
    MultiSelectModule,
    ToastrModule.forRoot({positionClass: 'toast-top-right',
      preventDuplicates: false,
      progressBar:true,
      extendedTimeOut:1000,}),
    QRCodeModule,
    SignaturePadModule,
    
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.zIndex = {
          modal: 1100,    // dialog, sidebar
          overlay: 1100,  // dropdown, overlaypanel
          menu: 1000,     // overlay menus
          tooltip: 1100   // tooltip
      };
      this.primengConfig.filterMatchModeOptions = {
        text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    };
    }
}
platformBrowser().bootstrapModule(AppModule);