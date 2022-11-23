import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SystemParameterService } from 'src/app/Service/systemParameter.service';

@Component({
  selector: 'app-sp-delete',
  templateUrl: './sp-delete.component.html',
})
export class SpDeleteComponent  implements OnInit {
  @Input() customerId : number = 0;
  constructor(private SystemParameterService: SystemParameterService, public dialogRef: MatDialogRef<SpDeleteComponent>) { }

  ngOnInit(): void {
  }

  onDelete()
  {
      this.SystemParameterService.Delete(this.customerId).subscribe(response => {
          this.dialogRef.close(response);
      })
  }

}