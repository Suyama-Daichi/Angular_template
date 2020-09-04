import { Static } from 'src/app/static';
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
    { id: 'fieldB', name: '入力B', fieldType: 'input', inputType: 'text', required: true, pattern: { patternName: 'カタカナ', pattern: this.statics.zenkakuKana } },
    { id: 'fieldC', name: '入力C', fieldType: 'input', inputType: 'number', max: 5, min: -1 },
    { id: 'fieldD', name: '入力D', fieldType: 'select', options: this.options },
    { id: 'fieldE', name: '入力E', fieldType: 'datePicker' }
  ]
  formGroup: FormGroup = this.fb.group({});
  constructor(
    private fb: FormBuilder,
    private statics: Static
  ) { }

  ngOnInit(): void {
  }

  formInitialized(name: string, e: FormControl) {
    this.formGroup.setControl(name, e);
  }


  submit() {
    console.log(this.formGroup.value);
  }

}
