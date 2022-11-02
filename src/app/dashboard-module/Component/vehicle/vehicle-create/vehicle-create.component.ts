import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from 'src/app/Service/vehicle.service';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
})
export class VehicleCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;
  listProductGroup: any=[];
  listUnit: any=[];
  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;
  constructor(private VehicleService: VehicleService, public dialogRef: MatDialogRef<VehicleCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      vehicle: new FormControl('', Validators.required),
      idCardNumber: new FormControl('', Validators.required),
      nameDriver: new FormControl(),
      tonnageDefault: new FormControl(),
      tonnage: new FormControl(),
      heightVehicle : new FormControl(),
      widthVehicle : new FormControl(),
      longVehicle: new FormControl(),
      unladenWeight1: new FormControl(),
      unladenWeight2: new FormControl(),
      unladenWeight3: new FormControl(),
      isSetMediumUnladenWeight: new FormControl(),
    })
  }

  ngOnInit(): void {
    //Edit
    if (this.customerId && this.isCreate === false) {
      this.VehicleService.GetDetail(this.customerId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          idVehicle: new FormControl(response.idVehicle),
          vehicle: new FormControl(response.vehicle),
          nameDriver: new FormControl(response.nameDriver),
          idCardNumber: new FormControl(response.idCardNumber),
          tonnage: new FormControl(response.tonnage),
          tonnageDefault: new FormControl(response.tonnageDefault),
          heightVehicle: new FormControl(response.heightVehicle),
          widthVehicle: new FormControl(response.widthVehicle),
          longVehicle: new FormControl(response.longVehicle),
          unladenWeight1: new FormControl(response.unladenWeight1),
          unladenWeight2: new FormControl(response.unladenWeight2),
          unladenWeight3: new FormControl(response.unladenWeight3),
          isSetMediumUnladenWeight: new FormControl(response.isSetMediumUnladenWeight),
          createDay: new FormControl(response.createDay),
          updateDay: new FormControl(response.updateDay),
          createBy: new FormControl(response.createBy),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  getGroupId(event: any) {
    this.CreateEditForm.value.groupId = event.target.value;
  }
  getUnitId(event: any) {
    this.CreateEditForm.value.unitId = event.target.value;
  }

  get vehicle() { return this.CreateEditForm.get('vehicle') }
  get idCardNumber() { return this.CreateEditForm.get('idCardNumber') }
  get nameDriver() { return this.CreateEditForm.get('nameDriver') }
  get tonnage() { return this.CreateEditForm.get('tonnage') }
  get tonnageDefault() { return this.CreateEditForm.get('tonnageDefault') }
  get heightVehicle() { return this.CreateEditForm.get('heightVehicle') }
  get widthVehicle() { return this.CreateEditForm.get('widthVehicle') }
  get longVehicle() { return this.CreateEditForm.get('longVehicle') }
  get unladenWeight1() { return this.CreateEditForm.get('unladenWeight1') }
  get unladenWeight2() { return this.CreateEditForm.get('unladenWeight2') }
  get unladenWeight3() { return this.CreateEditForm.get('unladenWeight3') }
  get isSetMediumUnladenWeight() { return this.CreateEditForm.get('isSetMediumUnladenWeight') }

  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.VehicleService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.VehicleService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }

  }




}