import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() fieldProps: Field;
  @Input() all: boolean;
  @Input() options: Option[];
  @Input() form: FormControl;
  @Output() changeValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.initForm();
    this.changeValue.emit(this.form);
    this.form.valueChanges.subscribe(s => {
      this.changeValue.emit(this.form);
    })
  }

  initForm() {
    this.form = new FormControl(null, Validators.compose([
      this.fieldProps.required ? Validators.required : null
    ]
    ));
  }

}

export interface Option {
  value: string;
  label: string;
}

export interface Field {
  id: string;
  name: string;
  fieldType: 'input' | 'select' | 'datePicker';
  inputType?: 'text' | 'number';
  required?: boolean;
  pattern?: RegExp;
  max?: number;
  min?: number;
}