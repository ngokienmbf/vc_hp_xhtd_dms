import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from 'src/app/Service/device.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
})
export class DeviceCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;
  listProductGroup: any=[];
  listUnit: any=[];

  @Input() customerId : number = 0;
  @Input() isCreate: boolean = true;

  constructor(private DeviceService: DeviceService, public dialogRef: MatDialogRef<DeviceCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      code: new FormControl('', Validators.required),
      name : new FormControl(),
      codeParent : new FormControl('', Validators.required),
      port: new FormControl(),
      ipaddress: new FormControl(),
      inputPort: new FormControl(),
      outputAddrType: new FormControl(),
      outputPort: new FormControl(),
      operID: new FormControl(),
      doorAction: new FormControl(),
      doorOrAuxoutID: new FormControl(),
    })
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.DeviceService.GetDetail(this.customerId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          code: new FormControl(response.code),
          name: new FormControl(response.name),
          codeParent: new FormControl(response.codeParent),
          port: new FormControl(response.port),
          ipaddress: new FormControl(response.ipaddress),
          inputPort : new FormControl(response.inputPort),
          outputAddrType : new FormControl(response.outputAddrType),
          outputPort: new FormControl(response.outputPort),
          operID: new FormControl(response.operID),
          doorAction: new FormControl(response.doorAction),
          doorOrAuxoutID: new FormControl(response.doorOrAuxoutID),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  get code() { return this.CreateEditForm.get('code'); }
  get name() { return this.CreateEditForm.get('name') }
  get codeParent() { return this.CreateEditForm.get('codeParent') }
  get port() { return this.CreateEditForm.get('port') }
  get ipaddress() { return this.CreateEditForm.get('ipaddress') }
  get inputPort() { return this.CreateEditForm.get('inputPort') }
  get outputAddrType() { return this.CreateEditForm.get('outputAddrType') }
  get outputPort() { return this.CreateEditForm.get('outputPort') }
  get operID() { return this.CreateEditForm.get('operID') }
  get doorAction() { return this.CreateEditForm.get('doorAction') }
  get doorOrAuxoutID() { return this.CreateEditForm.get('doorOrAuxoutID') }
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
      this.DeviceService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.DeviceService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }

  }

}