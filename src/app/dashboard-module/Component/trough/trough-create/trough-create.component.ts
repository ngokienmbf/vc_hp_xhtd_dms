import { TroughService } from './../../../../Service/trough.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trough-create',
  templateUrl: './trough-create.component.html',
  styleUrls: ['./trough-create.component.css']
})
export class TroughCreateComponent implements OnInit {

  CreateEditForm!: FormGroup;
  submited: boolean = false;
  @Input() createId: number = 0;
  @Input() isCreate: boolean = true;
  lstState = [{ value: true, name: "Kích hoạt" }, { value: false, name: "Khoá" }]
  lstWorking = [{ value: true, name: "Đang làm" }, { value: false, name: "Dừng" }]
  lstProblem = [{ value: true, name: "Có vấn đề" }, { value: false, name: "Không" }]
  lstIsPicking = [{ value: true, name: "true"}, { value: false, name: "false"}]
  lstIsInviting = [{ value: true, name: "true"}, { value: false, name: "false"}]
  constructor(private troughService: TroughService, public dialogRef: MatDialogRef<TroughCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      height: new FormControl(),
      width: new FormControl(),
      long: new FormControl(),
      working: new FormControl(),
      problem: new FormControl(),
      state: new FormControl(),
      deliveryCodeCurrent: new FormControl(''),
      planQuantityCurrent: new FormControl(),
      countQuantityCurrent: new FormControl(),
      isPicking: new FormControl(),
      transportNameCurrent: new FormControl(''),
      checkInTimeCurrent: new FormControl(),
      isInviting: new FormControl(),
      lineCode: new FormControl(''),
    })
  }

  ngOnInit(): void {
    //Edit
    if (this.createId && this.isCreate === false) {
      this.troughService.GetDetail(this.createId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          code: new FormControl(response.code),
          name: new FormControl(response.name),
          height: new FormControl(response.height),
          width: new FormControl(response.width),
          long: new FormControl(response.long),
          working: new FormControl(response.working),
          problem: new FormControl(response.problem),
          state: new FormControl(response.state),
          deliveryCodeCurrent: new FormControl(response.deliveryCodeCurrent),
          planQuantityCurrent: new FormControl(response.planQuantityCurrent),
          countQuantityCurrent: new FormControl(response.countQuantityCurrent),
          isPicking: new FormControl(response.isPicking),
          transportNameCurrent: new FormControl(response.transportNameCurrent),
          checkInTimeCurrent: new FormControl(response.checkInTimeCurrent),
          isInviting: new FormControl(response.isInviting),
          lineCode: new FormControl(response.lineCode),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  onSubmit() {
    this.submited = true;
    console.log(this.CreateEditForm)
    if (this.CreateEditForm.valid && this.isCreate === true) {
      this.troughService.Insert(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      });
    }
    if (this.CreateEditForm.valid && this.isCreate === false) {
      this.troughService.Update(this.CreateEditForm.value).subscribe(response => {
        this.dialogRef.close(response);
      })
    }

  }


}
