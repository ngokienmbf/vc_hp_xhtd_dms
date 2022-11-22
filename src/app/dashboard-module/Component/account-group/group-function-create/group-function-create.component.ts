import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Item } from 'src/app/Model/multidropdown';
import { AccGrFuncService } from 'src/app/Service/accGrFunc.service';
import { AccountGroupService } from 'src/app/Service/accountGroup.service';

@Component({
  selector: 'app-group-function-create',
  templateUrl: './group-function-create.component.html',
})
export class AccGrFuncCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId : number = 0;
  @Input() isCreate: boolean = true;

  constructor(private AccountGroupService: AccountGroupService,private AccGrFuncService: AccGrFuncService,
               public dialogRef: MatDialogRef<AccGrFuncCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      groupId: new FormControl(),
      functionId : new FormControl(),
      f_Add: new FormControl(),
      f_Edit: new FormControl(),
      f_Del: new FormControl(),
      f_View: new FormControl(),
      f_Print: new FormControl(),
      f_Other: new FormControl(),
    })
  }

  _add: boolean = true;
  _edit: boolean = true;
  _view: boolean = true;
  _del: boolean = true;
  _print: boolean = true;
  _other: boolean = true;

  radioChange(event: MatRadioChange, param: number) {
    switch (param) {
      case 0:
        this.CreateEditForm.get('f_Add')?.setValue(event.value);
        this._add = event.value;
        break;
      case 1:
        this.CreateEditForm.get('f_Edit')?.setValue(event.value);
        this._edit = event.value;
        break;
      case 2:
        this.CreateEditForm.get('f_Del')?.setValue(event.value);
        this._del = event.value;
        break;
      case 3:
        this.CreateEditForm.get('f_View')?.setValue(event.value);
        this._view= event.value;
        break;
      case 4:
        this.CreateEditForm.get('f_Print')?.setValue(event.value);
        this._print = event.value;
        break;
      case 5:
        this.CreateEditForm.get('f_Other')?.setValue(event.value);
        this._other = event.value;
        break;
    
      default:
      console.log("No such param exists!");
      break;
    }
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) {
      this.AccGrFuncService.GetDetail(this.customerId).subscribe(response => {
        this.groupSelected = response.groupId.toString(),
        this._add = response.f_Add;
        this._edit = response.f_Edit;
        this._del = response.f_Del;
        this._view = response.f_View;
        this._print = response.f_Print;
        this._other = response.f_Other;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          groupId: new FormControl(response.groupId),
          functionId : new FormControl(response.functionId),
          f_Add: new FormControl(response.f_Add),
          f_Edit: new FormControl(response.f_Edit),
          f_Del: new FormControl(response.f_Del),
          f_View: new FormControl(response.f_View),
          f_Print: new FormControl(response.f_Print),
          f_Other: new FormControl(response.f_Other),

          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
        this.AccountGroupService.GetFull().subscribe((data) => {
          this.groupList = data;
        });
      })

    } else {
      this.AccountGroupService.GetFull().subscribe((data) => {
        this.groupList = data;
      });
    }
  }

  onSubmit() {
    this.submited = true;
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CreateEditForm.get('f_Add')?.setValue(this._add);
      this.CreateEditForm.get('f_Edit')?.setValue(this._edit);
      this.CreateEditForm.get('f_Del')?.setValue(this._del);
      this.CreateEditForm.get('f_View')?.setValue(this._view);
      this.CreateEditForm.get('f_Print')?.setValue(this._print);
      this.CreateEditForm.get('f_Other')?.setValue(this._other);
      this.AccGrFuncService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.AccGrFuncService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }
  }

  get groupId() { return this.CreateEditForm.get('groupId') }

  groupSelected: string = "";
  groupList: Item[] = [];

  onDropDownChange(item: Item): void {
    if(!item.checked){
      this.groupSelected = '';
      this.CreateEditForm.get('groupId')?.setValue(0);
    }
    else
    {
      this.groupSelected = item.name;
      this.CreateEditForm.get('groupId')?.setValue(+item.name);
    }
  }
}