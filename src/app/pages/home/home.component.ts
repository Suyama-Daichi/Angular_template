import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/components/parts/form-field/form-field.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  options: Option[] = [
    {value: 'OptionA', label: 'オプションA'},
    {value: 'OptionB', label: 'オプションB'}
  ];
  formGroup: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  catchFormData(name: string, e: FormControl) {
    this.formGroup.setControl(name, e);
  }

}
