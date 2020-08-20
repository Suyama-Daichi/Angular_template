import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { SignupComponent } from './signup.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'confirm', component: ConfirmAccountComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
