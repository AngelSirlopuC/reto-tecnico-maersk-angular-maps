import { Component, OnInit, Input, EventEmitter,Output, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { FormModel } from 'src/app/models/form-input.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() latitud? : number;
  @Input() longitud? : number;
  public formulario!: FormGroup;
  @Output() submit = new EventEmitter();
  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  ngOnChanges(e : SimpleChanges){
    if(this.formulario && e.latitud){
      this.formulario.patchValue({
        latitud: e.latitud.currentValue
      })
    }
    if(this.formulario && e.longitud){
      this.formulario.patchValue({
        longitud: e.longitud.currentValue
      })
    }
  }

  private crearFormulario() {
    this.formulario = this.fb.group({
      placa: new FormControl('', [Validators.required]),
      tipo: new FormControl('1', [Validators.required]),
      latitud: new FormControl('-12.0526096', [Validators.required, ]),
      longitud: new FormControl('-77.069303', [Validators.required, ]),
    });
  }

  addVehicule(data : any){
    if(this.formulario.valid){
      const form : FormModel = {
        placa: this.formulario.controls['placa'].value,
        latitud: this.formulario.controls['latitud'].value,
        longitud: this.formulario.controls['longitud'].value,
        tipo: this.formulario.controls['tipo'].value,
      };
      this.submit.emit(form);
      this.formulario.reset();
      this.formulario.controls['tipo'].setValue("1");
    }
  }
}
