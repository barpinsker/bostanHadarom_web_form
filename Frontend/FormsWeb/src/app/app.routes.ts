import { ApplicationConfig, NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes, provideRouter } from '@angular/router';
import { DesktopComponent } from './desktop/desktop.component';
export const routes: Routes = [
        {path:"",redirectTo:"/desktop",pathMatch:"full"},
        {path:"desktop",component:DesktopComponent},
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
