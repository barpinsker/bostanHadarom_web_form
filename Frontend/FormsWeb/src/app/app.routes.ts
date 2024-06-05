import { ApplicationConfig, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, provideRouter } from '@angular/router';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { TableOfStandards } from './pages/table-of-standards/table-of-standards.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
export const routes: Routes = [
        {path:"",redirectTo:"/desktop",pathMatch:"full"},
        {path:"desktop",component:DesktopComponent},
        {path:"orders",component:OrdersPageComponent},
        {path:"table-of-standards",component:TableOfStandards},
        {path:"settings-page",component:SettingsPageComponent},
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
