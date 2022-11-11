import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Item } from 'src/app/Model/multidropdown';
import { DeviceService } from 'src/app/Service/device.service';
import { CategoryService } from 'src/app/Service/category.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
})
export class DeviceCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId : number = 0;
  @Input() isCreate: boolean = true;

  manCodeSelected: string = "";
  catCodeSelected: string = "";
  deviceList: Item[] = [];
  categoryList: Item[] = [];


  constructor(private DeviceService: DeviceService,private CategoryService: CategoryService, public dialogRef: MatDialogRef<DeviceCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      code: new FormControl('', Validators.required),
      name : new FormControl(),
      manCode : new FormControl('', Validators.required),
      catCode: new FormControl(),
      ipAddress: new FormControl(),
      portNumber: new FormControl(),

      portNumberDeviceIn: new FormControl(),
      portNumberDeviceOut: new FormControl(),
      portNumberDeviceIn1: new FormControl(),
      portNumberDeviceOut1: new FormControl(),
      portNumberDeviceIn2: new FormControl(),
      portNumberDeviceOut2: new FormControl(),

      descriptioon: new FormControl(),
      state: new FormControl(),
      showIndex: new FormControl(),
    })
  }

  stateChecked: boolean = true;
  radioChange(event: MatRadioChange) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    console.log(this.CreateEditForm.value.state);
    this.stateChecked = event.value;
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) {
      this.DeviceService.GetDetail(this.customerId).subscribe(response => {
        this.catCodeSelected = response.catCode;
        this.manCodeSelected = response.manCode;
        this.stateChecked = response.state;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          code: new FormControl(response.code),
          name : new FormControl(response.name),
          manCode : new FormControl(response.manCode),
          catCode: new FormControl(response.catCode),
          ipAddress: new FormControl(response.ipAddress),
          portNumber: new FormControl(response.portNumber),
    
          PortNumberDeviceIn: new FormControl(response.portNumberDeviceIn),
          PortNumberDeviceOut: new FormControl(response.portNumberDeviceOut),
          PortNumberDeviceIn1: new FormControl(response.portNumberDeviceIn1),
          PortNumberDeviceOut1: new FormControl(response.portNumberDeviceOut1),
          PortNumberDeviceIn2: new FormControl(response.portNumberDeviceIn2),
          PortNumberDeviceOut2: new FormControl(response.portNumberDeviceOut2),
    
          descriptioon: new FormControl(response.descriptioon),
          state: new FormControl(response.state),
          showIndex: new FormControl(response.showIndex),

          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
        this.DeviceService.GetAllFull().subscribe((data) => {
          this.deviceList = data;
        });
        this.CategoryService.GetFull().subscribe((data) => {
          this.categoryList = data;
        });
      })
    } else {
      this.DeviceService.GetAllFull().subscribe((data) => {
        this.deviceList = data;
      });
      this.CategoryService.GetFull().subscribe((data) => {
        this.categoryList = data;
      });
    }
  }

  get code() { return this.CreateEditForm.get('code'); }
  get name() { return this.CreateEditForm.get('name') }
  get catCode() { return this.CreateEditForm.get('catCode') }
  get manCode() { return this.CreateEditForm.get('manCode') }


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

  onManCodeDropDownChange(item: Item): void {
    if(!item.checked){
      this.CreateEditForm.value.manCode = '';
      this.manCodeSelected = '';
    }
    else
    {
      this.manCodeSelected = item.name;
      this.CreateEditForm.value.manCode = item.name;
    }
  }

  onCategoryDropDownChange(item: Item): void {
    if(!item.checked){
      this.CreateEditForm.value.catCode = '';
      this.catCodeSelected = '';
    }
    else
    {
      this.catCodeSelected = item.name;
      this.CreateEditForm.value.catCode = item.name;
    }
  }

}