import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from 'src/app/Service/device.service';

@Component({
  selector: 'app-device-delete',
  templateUrl: './device-delete.component.html',
})
export class DeviceDeleteComponent implements OnInit {
  @Input() customerId : number = 0;
  constructor(private DeviceService: DeviceService, public dialogRef: MatDialogRef<DeviceDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.DeviceService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
