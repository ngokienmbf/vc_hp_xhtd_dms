import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from 'src/app/Service/driver.service';

@Component({
  selector: 'app-driver-delete',
  templateUrl: './driver-delete.component.html',
})
export class DriverDeleteComponent implements OnInit {
  @Input() customerId : number = 0;
  constructor(private DriverService: DriverService, public dialogRef: MatDialogRef<DriverDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.DriverService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
