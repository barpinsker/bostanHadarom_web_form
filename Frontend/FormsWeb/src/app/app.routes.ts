import { ApplicationConfig, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, provideRouter } from '@angular/router';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
export const routes: Routes = [
        {path:"",redirectTo:"/desktop",pathMatch:"full"},
        {path:"desktop",component:DesktopComponent},
        {path:"orders",component:OrdersPageComponent},
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
