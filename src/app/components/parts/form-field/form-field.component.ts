import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() fieldType: 'input' | 'select' | 'datePicker';
  @Input() all: boolean;
  @Input() options: Option[];
  @Input() value: FormControl = new FormControl();
  @Output() changeValue = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.value.valueChanges.subscribe(s => {
      this.changeValue.emit(this.value);
    })
  }

}

interface Option {
  value: string;
  label: string;
}