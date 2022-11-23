import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from 'src/app/Service/driver.service';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
})
export class DriverCreateComponent implements OnInit {

  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;

  constructor(private DriverService: DriverService, public dialogRef: MatDialogRef<DriverCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      idCard: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      state : new FormControl(),
      vehicles : new FormControl(),
      address : new FormControl(),
      birthday: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
    })
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.DriverService.GetWithVehicles(this.customerId).subscribe(response => {
        this.stateChecked = response.state;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          fullName: new FormControl(response.fullName),
          vehicles: new FormControl(response.vehicles),
          userName: new FormControl(response.userName),
          idCard: new FormControl(response.idCard),
          phone: new FormControl(response.phone),
          state : new FormControl(response.state),
          address : new FormControl(response.address),
          birthday: new FormControl(response.birthday),
          email: new FormControl(response.email),
          gender: new FormControl(response.gender),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  get userName() { return this.CreateEditForm.get('userName') }
  get fullName() { return this.CreateEditForm.get('fullName') }
  get idCard() { return this.CreateEditForm.get('idCard') }
  get phone() { return this.CreateEditForm.get('phone') }

  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CreateEditForm.get('state')?.setValue(this.stateChecked);
      this.DriverService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.DriverService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }
  }

  stateChecked: boolean = true;

  radioChange(event: MatRadioChange) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    console.log(this.CreateEditForm.value.state);
    this.stateChecked = event.value;
  }

}