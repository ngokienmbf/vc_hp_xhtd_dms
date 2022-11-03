import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverVehicleService } from 'src/app/Service/drivervehicle.service';

@Component({
  selector: 'app-driver-vehicle-delete',
  templateUrl: './driver-vehicle-delete.component.html',
})
export class DriverVehicleDeleteComponent implements OnInit {

  @Input() customerId : number = 0;
  constructor(private DriverVehicleService: DriverVehicleService, public dialogRef: MatDialogRef<DriverVehicleDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.DriverVehicleService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
