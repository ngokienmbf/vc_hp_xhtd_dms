import { RfidService } from './../../../../Service/rfid.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-rfid-create',
  templateUrl: './rfid-create.component.html',
})
export class RfidCreateComponent implements OnInit {

  CreateEditForm!: FormGroup;
  submited: boolean = false;

  @Input() createId: number = 0;
  @Input() isCreate: boolean = true;



  //lstState = [{value: true, name: "Kích hoạt"}, { value: false, name: "Khoá"}]
  constructor(private rfidService: RfidService, public dialogRef: MatDialogRef<RfidCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      code: new FormControl(''),
      vehicle: new FormControl(''),
      dayReleased: new FormControl(),
      dayExpired: new FormControl(),
      note: new FormControl(''),
      state: new FormControl(),
      createDay: new FormControl(new Date()),
      createBy: new FormControl(''),
      updateDay: new FormControl(new Date()),
      updateBy: new FormControl(''),
      lastEnter: new FormControl(),
    })
  }
  
  stateChecked: boolean = true;
  radioChange(event: MatRadioChange) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    console.log(this.CreateEditForm.value.state);
    this.stateChecked = event.value;
  }

  ngOnInit(): void {
    //Edit
    if (this.createId && this.isCreate === false) {
      this.rfidService.GetDetail(this.createId).subscribe(response => {
        this.stateChecked = response.state;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          code: new FormControl(response.code),
          vehicle: new FormControl(response.vehicle),
          dayReleased: new FormControl(response.dayReleased),
          dayExpired: new FormControl(response.dayExpired),
          note: new FormControl(response.note),
          state: new FormControl(response.state),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
          lastEnter: new FormControl(response.lastEnter),
        })
      })
    }
  }

  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CreateEditForm.get('state')?.setValue(this.stateChecked);
      this.rfidService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.rfidService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }
  }
  

}
