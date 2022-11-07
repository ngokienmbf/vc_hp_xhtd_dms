import { TroughService } from './../../../../Service/trough.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trough-delete',
  templateUrl: './trough-delete.component.html',
  styleUrls: ['./trough-delete.component.css']
})
export class TroughDeleteComponent implements OnInit {

  @Input() idDelete : number = 0;
  constructor(private troughService: TroughService, public dialogRef: MatDialogRef<TroughDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.troughService.Delete(this.idDelete).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}
