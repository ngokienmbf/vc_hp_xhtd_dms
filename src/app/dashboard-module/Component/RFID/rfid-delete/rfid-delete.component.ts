import { RfidService } from './../../../../Service/rfid.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rfid-delete',
  templateUrl: './rfid-delete.component.html',
  styleUrls: ['./rfid-delete.component.css']
})
export class RfidDeleteComponent implements OnInit {
  @Input() idDelete : number = 0;
  constructor(private rfidService: RfidService, public dialogRef: MatDialogRef<RfidDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.rfidService.Delete(this.idDelete).subscribe(response => {
          this.dialogRef.close(response);
      })
  }
}
