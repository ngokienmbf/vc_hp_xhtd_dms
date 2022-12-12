import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { Item } from 'src/app/Model/multidropdown';
import { AccountService } from 'src/app/Service/account.service';
import { AccountGroupService } from 'src/app/Service/accountGroup.service';
import { AccountResetPassComponent } from '../account-resetpass/account-resetpass.component';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
})
export class AccountCreateComponent implements OnInit {

 
  CreateEditForm!: FormGroup
  submited: boolean = false;

  @Input() customerId: number = 0;
  @Input() isCreate: boolean = true;

  constructor(private AccountService: AccountService, 
    public dialog: MatDialog,
    private toastr : ToastrcustomService,
    private AccountGroupService: AccountGroupService, public dialogRef: MatDialogRef<AccountCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      fullName: new FormControl(),
      password: new FormControl(),
      groupId: new FormControl(),
      state: new FormControl(),
      deviceId: new FormControl(),
      deviceIdDayUpdate: new FormControl(),
    })
  }

  ngOnInit(): void {
    if (this.customerId && this.isCreate === false) { 
    //Edit
      this.AccountService.GetDetail(this.customerId).subscribe(response => {
        this.groupSelected = response.groupId.toString(),
        this.stateChecked = response.state;

        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          userName: new FormControl(response.userName),
          fullName: new FormControl(response.fullName),
          password: new FormControl(),
          groupId: new FormControl(response.groupId),
          state: new FormControl(response.state),
          deviceId: new FormControl(response.deviceId),
          deviceIdDayUpdate: new FormControl(response.deviceIdDayUpdate),

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

  get userName() { return this.CreateEditForm.get('userName') }

  onSubmit() {
    this.submited = true;
    // console.log(this.CreateEditForm.value)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.CreateEditForm.get('state')?.setValue(this.stateChecked);
      this.AccountService.Insert(this.CreateEditForm.value).subscribe(reAccountonse => {
        this.dialogRef.close(reAccountonse);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.AccountService.Update(this.CreateEditForm.value).subscribe(reAccountonse => {
        this.dialogRef.close(reAccountonse);
      })
    }
  }

  stateChecked: boolean = true;

  radioChange(event: MatRadioChange) {
    this.CreateEditForm.get('state')?.setValue(event.value);
    this.stateChecked = event.value;
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


  ngAfterViewInit() {
    setTimeout(() => {
      // turn off any input field
      document.querySelectorAll('input').forEach((element) => {
        element.setAttribute('autocomplete', 'disabled');
      });
      document.querySelectorAll('textarea').forEach((element) => element.setAttribute('autocomplete', 'disabled'));

      // this code disable address fields
      document.querySelector('#address-form-google-search')?.setAttribute('autocomplete', 'nope');
      if (/Edg/.test(navigator.userAgent)) {
        //this.setAddressFields('additional-name');
      } else {
        //this.setAddressFields('nope');
      }

      // other fields may still save the information by looking at name, here we randomize the name
      const random = Math.random();
      document.querySelectorAll('input').forEach((element) => {
        if (element.id !== 'address-form-google-search') {
          element.setAttribute('name', element.name + '_' + random);
        }
      });

    }, 200);
  }
  
  openResetPassword(id: number){
    this.customerId = id;
    const dialogRef = this.dialog.open(AccountResetPassComponent);
    dialogRef.componentInstance.customerId = this.customerId;
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.succeeded === true){
          this.toastr.showSuccess(result.message);
        }
        else
        {
          this.toastr.showError(result.message);
        }
      }
    });
  }

}
