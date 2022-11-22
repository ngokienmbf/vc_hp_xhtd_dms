import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/Service/account.service';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
})
export class AccountDeleteComponent  implements OnInit {
  @Input() customerId : number = 0;
  constructor(private AccountService: AccountService, public dialogRef: MatDialogRef<AccountDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.AccountService.Delete(this.customerId).subscribe(reAccountonse => {
          this.dialogRef.close(reAccountonse);
      })
  }

}