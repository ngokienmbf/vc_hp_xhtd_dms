import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  title: string = ''
  btnSubmit: boolean = false;
  constructor(public dialogRef: MatDialogRef<PopupComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close({ event: 'submit'})
  }

  onClose() {
    this.dialogRef.close({ event: 'cancel'})
  }

}
