import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../../Model/multidropdown';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverVehicleService } from 'src/app/Service/drivervehicle.service';
import { VehicleService } from 'src/app/Service/vehicle.service';
import { DriverService } from 'src/app/Service/driver.service';


@Component({
  selector: 'app-driver-vehicle-create',
  templateUrl: './driver-vehicle-create.component.html',
})
export class DriverVehicleCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;


  vehicleSelected: string = "";
  vehicleList: Item[] = [];
  userNameSelected: string = "";
  userNameList: Item[] = [];

  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;

  constructor(private DriverVehicleService: DriverVehicleService,
              private VehicleService: VehicleService,
              private DriverService: DriverService,
              public dialogRef: MatDialogRef<DriverVehicleCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      vehicle: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
    })
  }
  tmp?: string[];

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.DriverVehicleService.GetDetail(this.customerId).subscribe(response => {
        this.vehicleSelected = response.vehicle;
        this.userNameSelected = response.userName;

        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          vehicle: new FormControl(response.vehicle),
          userName: new FormControl(response.userName),         
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })

        this.VehicleService.GetFull().subscribe((data) => {
          this.vehicleList = data;
        });

        this.DriverService.GetFull().subscribe((data) => {
          this.userNameList = data;
        });
      })

    } else {
      this.VehicleService.GetFull().subscribe((data) => {
        this.vehicleList = data;
      });

      this.DriverService.GetFull().subscribe((data) => {
        this.userNameList = data;
      });
    }
  }

  onSubmit() {
    this.submited = true;
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.DriverVehicleService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.DriverVehicleService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }
  }

  get userName() { return this.CreateEditForm.get('userName'); }
  get vehicle() { return this.CreateEditForm.get('vehicle'); }

  onUserNameDropDownChange(item: Item): void {
    if(!item.checked){
      // this.CreateEditForm.value.userName = '';
      this.userNameSelected = '';
      this.CreateEditForm.get('userName')?.setValue('');
    }
    else
    {
      this.userNameSelected = item.name;
      // this.CreateEditForm.value.userName = item.name;
      this.CreateEditForm.get('userName')?.setValue(item.name);
    }
    // console.log(this.CreateEditForm.value.userName);
    // console.log(this.CreateEditForm.get('userName'));
  }
  
  onVehicleDropDownChange(item: Item): void {
    console.log(item);
    if(!item.checked){
      this.vehicleSelected = '';
      this.CreateEditForm.get('vehicle')?.setValue('');
    }
    else
    {
      this.vehicleSelected = item.name;
      this.CreateEditForm.get('vehicle')?.setValue(item.name);
    }
  }


}