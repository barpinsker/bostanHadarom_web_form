import { ApplicationConfig, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, provideRouter } from '@angular/router';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { TableOfStandards } from './pages/table-of-standards/table-of-standards.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { TableQualityFormsComponent } from './pages/table-quality-forms/table-quality-forms.component';
import { DisinfectantsOfTableComponent } from './pages/disinfectants-of-table/disinfectants-of-table.component';
import { QrPageOrderComponent } from './pages/orders-page/qr-page-order/qr-page-order.component';
import { FormDeliveryControlComponent } from './pages/forms/form-delivery-control/form-delivery-control.component';
import { ControlTableComponent } from './pages/control-table/control-table.component';
import { KanatFormComponent } from './pages/forms/kanat-form/kanat-form.component';
import { QualityTableComponent } from './pages/quality-table/quality-table.component';
import { QualityFormComponent } from './pages/forms/quality-form/quality-form.component';

export const routes: Routes = [
        {path:"",redirectTo:"/desktop",pathMatch:"full"},
        {path:"desktop",component:DesktopComponent},
        {path:"orders",component:OrdersPageComponent},
        {path:"table-of-standards",component:TableOfStandards},
        {path:"settings-page",component:SettingsPageComponent},
        {path:"table-quality-forms",component:TableQualityFormsComponent},
        {path:"disinfectants-of-table",component:DisinfectantsOfTableComponent},
        {path:"qr-page-order",component:QrPageOrderComponent},
        {path:'form-delivery-control',component:FormDeliveryControlComponent},
        {path:'kant-form',component:KanatFormComponent},
        {path:"control-table",component:ControlTableComponent},
        {path:"quality-table",component:QualityTableComponent},
        {path:'quality-form',component:QualityFormComponent},
        // {path:'desktop',loadChildren: () => import('./app.module').then(m => m.AppModule)},

];
const config: ExtraOptions = {
        useHash: false,
        enableTracing:true
      };
@NgModule({
imports: [RouterModule.forRoot(routes,config)],
exports: [RouterModule]
})
export class AppRoutingModule { }
