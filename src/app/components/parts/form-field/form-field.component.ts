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
  maxErrorMessage: string = `以下で入力してください`
  minErrorMessage: string = `以上で入力してください`
  
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
      this.fieldProps.required ? Validators.required : null,
      this.fieldProps.pattern ? Validators.pattern(this.fieldProps.pattern.pattern) : null,
      this.fieldProps.max ? Validators.max(this.fieldProps.max) : null,
      this.fieldProps.min ? Validators.min(this.fieldProps.min) : null
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
  options?: Option[],
  inputType?: 'text' | 'number';
  required?: boolean;
  pattern?: Pattern;
  max?: number;
  min?: number;
}

interface Pattern {
  patternName: string;
  pattern: RegExp;
}