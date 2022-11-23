import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountGroupService } from 'src/app/Service/accountGroup.service';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
})
export class AccountGroupDeleteComponent implements OnInit {
  @Input() customerId : number = 0;
  constructor(private AccountGroupService: AccountGroupService, public dialogRef: MatDialogRef<AccountGroupDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.AccountGroupService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
