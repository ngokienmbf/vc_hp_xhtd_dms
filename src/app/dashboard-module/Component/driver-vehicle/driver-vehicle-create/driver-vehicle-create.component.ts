import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../../Model/multidropdown';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverVehicleService } from 'src/app/Service/drivervehicle.service';
import { VehicleService } from 'src/app/Service/vehicle.service';
import { DriverService } from 'src/app/Service/driver.service';
import { userNames, vehicles } from '../../../../Model/fakedata';


@Component({
  selector: 'app-driver-vehicle-create',
  templateUrl: './driver-vehicle-create.component.html',
})
export class DriverVehicleCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;
  listProductGroup: any=[];
  listUnit: any=[];

  userNameSelected: string = "";
  vehicleSelected: string = "";
  vehicleList: Item[] = [];
  userNameList: Item[] = [];

  userNameOrigin: string = "";
  vehicleOrigin: string = "";

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

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.DriverVehicleService.GetDetail(this.customerId).subscribe(response => {
        this.userNameOrigin = response.userName;
        this.vehicleOrigin = response.vehicle;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          vehicle: new FormControl(response.vehicle),
          userName: new FormControl(response.userName),
         
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
    this.GetVehicleList();
    this.GetUserNameList();
  }


  GetVehicleList()
  {
    // this.VehicleService.GetVehicleList.subscribe(data=> {
    //   this.vehicleList = data;
    // })

  }

  GetUserNameList(){
    // this.DriverService.GetUserNameList().subscribe(data=> {
    //   this.userNameList = data;
    // })
    this.userNameList = userNames;
  }

  get userName() { return this.CreateEditForm.get('userName'); }
  get vehicle() { return this.CreateEditForm.get('vehicle') }
 

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

  onUserNameDropDownChange(item: Item): void {
    if(!item.checked){
      this.CreateEditForm.value.userName = null;
    }
    else
    {
      this.userNameSelected = item.name;
    }
  }

}