import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { LoginGuard } from './guard/login.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'signup', loadChildren: () => import('../app/pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
