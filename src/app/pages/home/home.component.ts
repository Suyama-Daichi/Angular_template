import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    fieldA: [],
    fieldB: []
  });
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
