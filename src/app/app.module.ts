import { NgModule } from '@angular/core';
import { SharedModule } from '../app/shared/shared.module'
import { SignupModule } from '../app/pages/signup/signup.module'

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { JPDateAdapter } from './shared/jp-date-adapter';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { FormFieldComponent } from './components/parts/form-field/form-field.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    FormFieldComponent
  ],
  imports: [
    SharedModule,
    SignupModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    { provide: DateAdapter, useClass: JPDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
