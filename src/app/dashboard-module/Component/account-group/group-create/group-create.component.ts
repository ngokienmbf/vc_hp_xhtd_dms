import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { AccountGroupService } from 'src/app/Service/accountGroup.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
})
export class AccountGroupCreateComponent implements OnInit {
  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId : number = 0;
  @Input() isCreate: boolean = true;

  manCodeSelected: string = "";
  catCodeSelected: string = "";

  constructor(private AccountGroupService: AccountGroupService,  public dialogRef: MatDialogRef<AccountGroupCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      name : new FormControl(),
      state: new FormControl(),
    })
  }

  stateChecked: boolean = true;
  radioChange(event: MatRadioChange) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    this.stateChecked = event.value;
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) {
      this.AccountGroupService.GetDetail(this.customerId).subscribe(response => {
        this.stateChecked = response.state;
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          name : new FormControl(response.name),
          state: new FormControl(response.state),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })

      })
    }
  }

  get name() { return this.CreateEditForm.get('name') }


  onSubmit() {
    this.submited = true;
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CreateEditForm.get('state')?.setValue(this.stateChecked);
      this.AccountGroupService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.AccountGroupService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }
  }

}