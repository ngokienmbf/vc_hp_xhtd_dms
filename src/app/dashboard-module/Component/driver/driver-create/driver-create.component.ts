import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from 'src/app/Service/driver.service';

@Component({
  selector: 'app-driver-create',
  templateUrl: './driver-create.component.html',
})
export class DriverCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;
  listProductGroup: any=[];
  listUnit: any=[];

  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;

  constructor(private DriverService: DriverService, public dialogRef: MatDialogRef<DriverCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      idCard: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      state : new FormControl(),
      address : new FormControl(),
      birthday: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
    })
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.DriverService.GetDetail(this.customerId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          fullName: new FormControl(response.fullName),
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

  get userName() { return this.CreateEditForm.get('userName'); }
  get fullName() { return this.CreateEditForm.get('fullName') }
  get idCard() { return this.CreateEditForm.get('idCard') }
  get phone() { return this.CreateEditForm.get('phone') }
  get state() { return this.CreateEditForm.get('state') }
  get address() { return this.CreateEditForm.get('address') }
  get birthday() { return this.CreateEditForm.get('birthday') }
  get email() { return this.CreateEditForm.get('phonemaile') }
  get gender() { return this.CreateEditForm.get('gender') }
  get createDay() { return this.CreateEditForm.get('createDay') }
  get createBy() { return this.CreateEditForm.get('createBy') }
  get updateDay() { return this.CreateEditForm.get('updateDay') }
  get updateBy() { return this.CreateEditForm.get('updateBy') }


  getGroupId(event: any) {
    this.CreateEditForm.value.groupId = event.target.value;
  }
  getUnitId(event: any) {
    this.CreateEditForm.value.unitId = event.target.value;
  }

  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
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

}