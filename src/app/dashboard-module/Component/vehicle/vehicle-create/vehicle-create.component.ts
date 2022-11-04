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
  listProductGroup: any = [];
  listUnit: any = [];
  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;
  constructor(private VehicleService: VehicleService, public dialogRef: MatDialogRef<VehicleCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      vehicle: new FormControl(''),
      tonnage: new FormControl(),
      tonnageDefault: new FormControl(),
      nameDriver: new FormControl(''),
      idCardNumber: new FormControl(''),
      heightVehicle: new FormControl(),
      widthVehicle: new FormControl(),
      longVehicle: new FormControl(),
      unladenWeight1: new FormControl(),
      unladenWeight2: new FormControl(),
      unladenWeight3: new FormControl(),
      isSetMediumUnladenWeight: new FormControl(),
      createDay: new FormControl(),
      createBy: new FormControl(''),
      updateDay: new FormControl(),
      updateBy: new FormControl(''),
    })
  }

  ngOnInit(): void {
    //Edit
    if (this.customerId && this.isCreate === false) {
      this.VehicleService.GetDetail(this.customerId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          iDVehicle: new FormControl(response.idVehicle),
          vehicle: new FormControl(response.vehicle),
          tonnage: new FormControl(response.tonnage),
          tonnageDefault: new FormControl(response.tonnageDefault),
          nameDriver: new FormControl(response.nameDriver),
          idCardNumber: new FormControl(response.idCardNumber),
          heightVehicle: new FormControl(response.heightVehicle),
          widthVehicle: new FormControl(response.widthVehicle),
          longVehicle: new FormControl(response.longVehicle),
          unladenWeight1: new FormControl(response.unladenWeight1),
          unladenWeight2: new FormControl(response.unladenWeight2),
          unladenWeight3: new FormControl(response.unladenWeight3),
          isSetMediumUnladenWeight: new FormControl(response.isSetMediumUnladenWeight),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }

  }

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
