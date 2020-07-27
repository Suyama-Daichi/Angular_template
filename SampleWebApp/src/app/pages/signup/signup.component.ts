import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegExp } from '../../static';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupInput: FormGroup;
  isShowpassword: boolean;
  isSubmited: boolean;
  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.signupInput = this.fb.group(
      {
        userName: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        password: [null, Validators.compose([Validators.required, Validators.pattern(passwordRegExp)])]
      }
    );
  }

  signinSubmit() {
    this.isSubmited = true;
    console.log(this.signupInput);
  }

}
