import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-account-resetpass',
  templateUrl: './account-resetpass.component.html',
})
export class AccountResetPassComponent  implements OnInit {
  @Input() customerId : number = 0;
  constructor(private AccountService: AccountService, public dialogRef: MatDialogRef<AccountResetPassComponent>) { }

  ngOnInit(): void {
  }

  onReset()
  {
      this.AccountService.ResetPassword(this.customerId).subscribe(reAccountonse => {
          this.dialogRef.close(reAccountonse);
      })
  }

}