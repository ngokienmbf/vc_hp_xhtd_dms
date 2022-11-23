import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccGrFuncService } from 'src/app/Service/accGrFunc.service';

@Component({
  selector: 'app-group-function-delete',
  templateUrl: './group-function-delete.component.html',
})
export class AccGrFuncDeleteComponent implements OnInit {
  @Input() customerId : number = 0;
  constructor(private AccGrFuncService: AccGrFuncService, public dialogRef: MatDialogRef<AccGrFuncDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.AccGrFuncService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
