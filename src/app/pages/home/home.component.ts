import { Field } from './../../components/parts/form-field/form-field.component';
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
    { value: 'OptionA', label: 'オプションA' },
    { value: 'OptionB', label: 'オプションB' }
  ];
  fields: Field[] = [
    { id: 'fieldA', name: '入力A', fieldType: 'input', inputType: 'text', required: true },
    { id: 'fieldB', name: '入力B', fieldType: 'input', inputType: 'number' }
  ]
  formGroup: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.formGroup);
  }

  formInitialized(name: string, e: FormControl) {
    this.formGroup.setControl(name, e);
    console.log(this.formGroup);
  }

}
