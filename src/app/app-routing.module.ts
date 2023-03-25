import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './config/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},  
  {path: '', loadChildren: ()=> import('./pages/product/product.module').then(m => m.ProductModule), canActivate:[AuthGuardService]},
  {path: '', loadChildren: ()=> import('./pages/report/report.module').then(m => m.ReportModule), canActivate:[AuthGuardService]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuardService]},
  { path:'signin', component: SigninComponent},
  { path:'signup', component: SignupComponent},
  {path: '**', redirectTo: 'home',  pathMatch: 'full',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
