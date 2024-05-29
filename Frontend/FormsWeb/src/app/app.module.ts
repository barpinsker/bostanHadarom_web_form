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
import { FormsModule } from '@angular/forms';
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
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOrderSurfacesComponent } from './pages/orders-page/dialog-order-surfaces/dialog-order-surfaces.component';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TableOfStandards } from './pages/table-of-standards/table-of-standards.component';
import { DialogRowStandardComponent } from './pages/table-of-standards/dialog-row-standard/dialog-row-standard.component';
import { MultiSelectModule } from 'primeng/multiselect';
const MyDefaultTooltipOptions: TooltipOptions = {
  'placement':'bottom',
  'show-delay': 200,
  'trigger':"click"
}
@NgModule({
  declarations: [AppComponent,SidebarComponent,OrdersPageComponent,DialogOrderSurfacesComponent,DesktopComponent,TableOfStandards,DialogRowStandardComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule,
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
    TooltipModule.forRoot(MyDefaultTooltipOptions as TooltipOptions),
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    CanvasJSAngularChartsModule,
    MultiSelectModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.zIndex = {
          modal: 1100,    // dialog, sidebar
          overlay: 1000,  // dropdown, overlaypanel
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