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
import { PanelMenuModule } from 'primeng/panelmenu';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { AppRoutingModule } from './app.routes';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatCardModule } from '@angular/material/card';
import { DesktopComponent } from './desktop/desktop.component';

@NgModule({
  declarations: [AppComponent,SidebarComponent,DesktopComponent],
  imports: [
    CommonModule,
    SidebarModule,
    FormsModule,
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    AvatarModule,
    AvatarGroupModule,
    BrowserModule,
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
    CanvasJSAngularChartsModule,
    MatCardModule
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