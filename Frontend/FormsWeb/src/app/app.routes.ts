import { ApplicationConfig, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, provideRouter } from '@angular/router';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { ShippingControlFormComponent } from './pages/forms/shipping-control-form/shipping-control-form.component';
import { FinishedProductFormComponent } from './pages/forms/finished-product-form/finished-product-form.component';
export const routes: Routes = [
        {path:"",redirectTo:"/desktop",pathMatch:"full"},
        {path:"desktop",component:DesktopComponent},
        {path:"orders",component:OrdersPageComponent},
        {path:"form/shipping-form",component:ShippingControlFormComponent},
        {path:"form/finished-product-form",component:FinishedProductFormComponent},
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
