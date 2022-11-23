import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { SystemParameterService } from 'src/app/Service/systemParameter.service';

@Component({
  selector: 'app-sp-create',
  templateUrl: './sp-create.component.html',
})
export class SpCreateComponent implements OnInit {

 
  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;

  constructor(private SystemParameterService: SystemParameterService, public dialogRef: MatDialogRef<SpCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      code: new FormControl('', Validators.required),
      name: new FormControl(),
      value: new FormControl(),
    })
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.SystemParameterService.GetDetail(this.customerId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          code: new FormControl(response.code),
          name: new FormControl(response.name),
          value: new FormControl(response.value),

          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  get code() { return this.CreateEditForm.get('code') }

  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.SystemParameterService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.SystemParameterService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }
  }

}
