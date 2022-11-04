import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/Model/multidropdown';
import { VehicleService } from 'src/app/Service/vehicle.service';
import { DriverService } from 'src/app/Service/driver.service';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
})
export class VehicleCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;
  listProductGroup: any = [];
  listUnit: any = [];

  userNameSelected: string = "";
  userNameList: Item[] = [];

  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;
  
  constructor(private VehicleService: VehicleService, private DriverService: DriverService, public dialogRef: MatDialogRef<VehicleCreateComponent>) {
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
      userName: new FormControl(),
    })
  }

  ngOnInit(): void {
    //Edit
    if (this.customerId && this.isCreate === false) {
      this.VehicleService.GetWithDriver(this.customerId).subscribe(response => {
        this.userNameSelected = response.userName;
        this.CreateEditForm = new FormGroup({
          idVehicle: new FormControl(response.idVehicle),
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
          userName: new FormControl(response.userName),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
        this.DriverService.GetAllFull().subscribe((data) => {
          this.userNameList = data;
          //this.userNameSelected = this.userNameList.find(x => x.value == this.CreateEditForm.get('userName')?.value||null)?.name||'xxx';
        });
      })
    }
            

  }

  get vehicle() { return this.CreateEditForm.get('vehicle') }

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

  onUserNameDropDownChange(item: Item): void {
    if(!item.checked){
      this.CreateEditForm.value.userName = '';
      this.userNameSelected = '';
    }
    else
    {
      this.userNameSelected = item.name;
      this.CreateEditForm.value.userName = item.name;
    }
  }


}
