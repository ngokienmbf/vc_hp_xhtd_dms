import { OrderOperatingService } from './../../../../Service/orderOperating.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-operating-create',
  templateUrl: './order-operating-create.component.html',
  styleUrls: ['./order-operating-create.component.css']
})
export class OrderOperatingCreateComponent implements OnInit {

  CreateEditForm!: FormGroup;
  submited: boolean = false;
  @Input() createId: number = 0;
  @Input() isCreate: boolean = true;
  constructor(private OrderOperatingService: OrderOperatingService,
    public dialogRef: MatDialogRef<OrderOperatingCreateComponent>) {
    this.CreateEditForm = new FormGroup({
      vehicle: new FormControl(),
      driverName: new FormControl(),
      nameDistributor: new FormControl(),
      itemId: new FormControl(),
      nameProduct: new FormControl(),
      catId: new FormControl(),
      sumNumber: new FormControl(),
      timeIn33: new FormControl(),
      cardNo: new FormControl(),
      orderId: new FormControl(),
      deliveryCode: new FormControl(),
      deliveryCodeParent: new FormControl(),
      orderDate: new FormControl(),
      typeProduct: new FormControl(),
      timeIn21: new FormControl(),
      timeIn22: new FormControl(),
      confirm1: new FormControl(),
      timeConfirm1: new FormControl(),
      confirm2: new FormControl(),
      timeConfirm2: new FormControl(),
      confirm3: new FormControl(),
      timeConfirm3: new FormControl(),
      confirm4: new FormControl(),
      timeConfirm4: new FormControl(),
      confirm5: new FormControl(),
      timeConfirm5: new FormControl(),
      confirm6: new FormControl(),
      timeConfirm6: new FormControl(),
      confirm7: new FormControl(),
      timeConfirm7: new FormControl(),
      confirm8: new FormControl(),
      timeConfirm8: new FormControl(),
      confirm9: new FormControl(),
      timeConfirm9: new FormControl(),
      confirm9Note: new FormControl(),
      confirm9Image: new FormControl(),
      step: new FormControl(),
      indexOrder: new FormControl(),
      indexOrder1: new FormControl(),
      indexOrder2: new FormControl(),
      trough: new FormControl(),
      trough1: new FormControl(),
      numberVoice: new FormControl(),
      state: new FormControl(),
      prioritize: new FormControl(),
      dayCreate: new FormControl(),
      iDDistributorSyn: new FormControl(),
      areaId: new FormControl(),
      areaName: new FormControl(),
      codeStore: new FormControl(),
      nameStore: new FormControl(),
      driverUserName: new FormControl(),
      driverAccept: new FormControl(),
      indexOrderTemp: new FormControl(),
      weightIn: new FormControl(),
      weightInTime: new FormControl(),
      weightOut: new FormControl(),
      weightOutTime: new FormControl(),
      noteFinish: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
      countReindex: new FormControl(),
      isVoiced: new FormControl(),
      locationCode: new FormControl(),
      lockInDbet: new FormControl(),
      logJobAttach: new FormControl(),
      isSyncedByNewWS: new FormControl(),
      troughLineCode: new FormControl(),
      isScaleAuto: new FormControl(),
      timeConfirmHistory: new FormControl(),
      logHistory: new FormControl(),
      moocCode: new FormControl(),
      logProcessOrder: new FormControl(),
      driverPrintNumber: new FormControl(),
      driverPrintTime: new FormControl(),
      warningNotCall: new FormControl(),
      xiRoiAttatchmentFile: new FormControl(),
      packageNumber: new FormControl(),
      shifts: new FormControl(),
      autoScaleOut: new FormControl(),
      createDay: new FormControl(),
      createBy: new FormControl(),
      updateDay: new FormControl(),
      updateBy: new FormControl(),
    })
  }

  ngOnInit(): void {
    //Edit
    if (this.createId && this.isCreate === false) {
      this.OrderOperatingService.GetDetail(this.createId).subscribe(response => {
        this.CreateEditForm = new FormGroup({
          id: new FormControl(response.id),
          vehicle: new FormControl(response.vehicle),
          driverName: new FormControl(response.driverName),
          nameDistributor: new FormControl(response.nameDistributor),
          itemId: new FormControl(response.itemId),
          nameProduct: new FormControl(response.nameProduct),
          catId: new FormControl(response.catId),
          sumNumber: new FormControl(response.sumNumber),
          timeIn33: new FormControl(response.timeIn33),
          cardNo: new FormControl(response.cardNo),
          orderId: new FormControl(response.orderId),
          deliveryCode: new FormControl(response.deliveryCode),
          deliveryCodeParent: new FormControl(response.deliveryCodeParent),
          orderDate: new FormControl(response.orderDate),
          typeProduct: new FormControl(response.typeProduct),
          timeIn21: new FormControl(response.timeIn21),
          timeIn22: new FormControl(response.timeIn22),
          confirm1: new FormControl(response.confirm1),
          timeConfirm1: new FormControl(response.timeConfirm1),
          confirm2: new FormControl(response.confirm2),
          timeConfirm2: new FormControl(response.timeConfirm2),
          confirm3: new FormControl(response.confirm3),
          timeConfirm3: new FormControl(response.timeConfirm3),
          confirm4: new FormControl(response.confirm4),
          timeConfirm4: new FormControl(response.timeConfirm4),
          confirm5: new FormControl(response.confirm5),
          timeConfirm5: new FormControl(response.timeConfirm5),
          confirm6: new FormControl(response.confirm6),
          timeConfirm6: new FormControl(response.timeConfirm6),
          confirm7: new FormControl(response.confirm7),
          timeConfirm7: new FormControl(response.timeConfirm7),
          confirm8: new FormControl(response.confirm8),
          timeConfirm8: new FormControl(response.timeConfirm8),
          confirm9: new FormControl(response.confirm9),
          timeConfirm9: new FormControl(response.timeConfirm9),
          confirm9Note: new FormControl(response.confirm9Note),
          confirm9Image: new FormControl(response.confirm9Image),
          step: new FormControl(response.step),
          indexOrder: new FormControl(response.indexOrder),
          indexOrder1: new FormControl(response.indexOrder1),
          indexOrder2: new FormControl(response.indexOrder2),
          trough: new FormControl(response.trough),
          trough1: new FormControl(response.trough1),
          numberVoice: new FormControl(response.numberVoice),
          state: new FormControl(response.state),
          prioritize: new FormControl(response.prioritize),
          dayCreate: new FormControl(response.dayCreate),
          iDDistributorSyn: new FormControl(response.iDDistributorSyn),
          areaId: new FormControl(response.areaId),
          areaName: new FormControl(response.areaName),
          codeStore: new FormControl(response.codeStore),
          nameStore: new FormControl(response.nameStore),
          driverUserName: new FormControl(response.driverUserName),
          driverAccept: new FormControl(response.driverAccept),
          indexOrderTemp: new FormControl(response.indexOrderTemp),
          weightIn: new FormControl(response.weightIn),
          weightInTime: new FormControl(response.weightInTime),
          weightOut: new FormControl(response.weightOut),
          weightOutTime: new FormControl(response.weightOutTime),
          noteFinish: new FormControl(response.noteFinish),
          longitude: new FormControl(response.longitude),
          latitude: new FormControl(response.latitude),
          countReindex: new FormControl(response.countReindex),
          isVoiced: new FormControl(response.isVoiced),
          locationCode: new FormControl(response.locationCode),
          lockInDbet: new FormControl(response.lockInDbet),
          logJobAttach: new FormControl(response.logJobAttach),
          isSyncedByNewWS: new FormControl(response.isSyncedByNewWS),
          troughLineCode: new FormControl(response.troughLineCode),
          isScaleAuto: new FormControl(response.isScaleAuto),
          timeConfirmHistory: new FormControl(response.timeConfirmHistory),
          logHistory: new FormControl(response.logHistory),
          moocCode: new FormControl(response.moocCode),
          logProcessOrder: new FormControl(response.logProcessOrder),
          driverPrintNumber: new FormControl(response.driverPrintNumber),
          driverPrintTime: new FormControl(response.driverPrintTime),
          warningNotCall: new FormControl(response.warningNotCall),
          xiRoiAttatchmentFile: new FormControl(response.xiRoiAttatchmentFile),
          packageNumber: new FormControl(response.packageNumber),
          shifts: new FormControl(response.shifts),
          autoScaleOut: new FormControl(response.autoScaleOut),
          createDay: new FormControl(response.createDay),
          createBy: new FormControl(response.createBy),
          updateDay: new FormControl(response.updateDay),
          updateBy: new FormControl(response.updateBy),
        })
      })
    }
  }

  onSubmit() {
    // this.submited = true;
    // console.log(this.CreateEditForm)
    // if (this.CreateEditForm.valid && this.isCreate === true) {
    //   this.troughService.Insert(this.CreateEditForm.value).subscribe(response => {
    //     this.dialogRef.close(response);
    //   });
    // }
    // if (this.CreateEditForm.valid && this.isCreate === false) {
    //   this.troughService.Update(this.CreateEditForm.value).subscribe(response => {
    //     this.dialogRef.close(response);
    //   })
    // }
  }
}
