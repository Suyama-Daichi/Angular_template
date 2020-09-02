import { SharedModule } from './../../shared/shared.module';
import { SignupComponent } from './signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';


@NgModule({
  declarations: [
    SignupComponent,
    ConfirmAccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
