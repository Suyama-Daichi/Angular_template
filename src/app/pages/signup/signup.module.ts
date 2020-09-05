import { ErrorComponent } from './../../components/parts/error/error.component';
import { SignupComponent } from './signup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';


@NgModule({
  declarations: [
    SignupComponent,
    ConfirmAccountComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SignupRoutingModule
  ]
})
export class SignupModule { }
