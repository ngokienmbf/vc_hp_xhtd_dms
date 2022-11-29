import { PopupComponent } from './../../../../View/popup/popup.component';
import { DriverDialogComponent } from './../../driver/driver-dialog/driver-dialog.component';
import { convertHelper } from 'src/app/utils/helper/convertHelper';
import { SignalrService } from '../../../../Service/signalr.service';
import { OrderOperatingService } from '../../../../Service/orderOperating.service';
import { lstOrderOperating } from '../../../../Model/OrderOperating';
import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from 'src/app/Model/Table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { OrderOperatingCreateComponent } from '../order-operating-create/order-operating-create.component';
import { lstStep } from 'src/app/utils/helper/constant';

@Component({
  selector: 'app-order-operating-list',
  templateUrl: './order-operating-list.component.html',
  styleUrls: ['./order-operating-list.component.css']
})
export class OrderOperatingListComponent implements OnInit {
  @Input() showType!: string;
  isCreate: boolean = true;
  loading: boolean = false;
  options = lstStep;
  idDetail: number = 0;
  volumeStatus: string = 'OFF';
  itemSelected: any = null;

  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  }

  lstdata: lstOrderOperating = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: []
  };

  PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10,
    deliveryCode: '',
    step: ''
  }
  constructor(private orderOperatingService: OrderOperatingService,
    private signalrService: SignalrService,
    public dialog: MatDialog,
    private toastr: ToastrcustomService,
    public convertHelper: convertHelper
  ) { }

  ngOnInit(): void {
    this.Pagingdata(this.PageInfo);

    this.signalrService.hubMessage.subscribe((hubMessage: string) => {
      this.reloadData(hubMessage);
    });
  }

  Pagingdata(PageInfo: any) {
    this.loading = true;
    this.orderOperatingService.Paging(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize, this.PageInfo.deliveryCode, this.PageInfo.step).subscribe(data => {
      this.lstdata = data;
      this.loading = false;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
    })
  }

  reloadData(hubMessage: any) {
    setTimeout(() => {
      if (!hubMessage) {
        return;
      }
      if (hubMessage.FromService === 'SYNC_ORDER') {
        this.Pagingdata(this.PageInfo)
      }
    }, 300)
  }

  openEdit(id: number) {
    this.isCreate = false;
    this.idDetail = id;
    const dialogRef = this.dialog.open(OrderOperatingCreateComponent);
    dialogRef.componentInstance.createId = this.idDetail;
    dialogRef.componentInstance.isCreate = this.isCreate;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.succeeded === true) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    })
  }

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    pageOfItems.deliveryCode = this.PageInfo.deliveryCode;
    pageOfItems.step = this.PageInfo.step;
    this.PageInfo = pageOfItems
    this.Pagingdata(pageOfItems)
  }
  searchVehicle(e: any) {
    this.PageInfo.Keyword = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  searchDeliverCode(e: any) {
    this.PageInfo.deliveryCode = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  searchStep(e: any) {
    this.PageInfo.step = e;
    this.PageInfo.page = 1;
    this.Pagingdata(this.PageInfo);
  }

  resetFilter() {
    this.PageInfo = {
      page: 1,
      Keyword: '',
      pageSize: 10,
      deliveryCode: '',
      step: ''
    }
    this.Pagingdata(this.PageInfo);
  }

  exportReport() {
    let showType = ''
    switch (this.showType) {
      case 'DHD':
        showType = 'listorder'
        break;
      case 'QLVR':
        showType = 'door'
        break;
      case 'QLTC':
        showType = 'weightStation'
        break;
      default:
        break;
    }

    return this.orderOperatingService.ExportReport(showType)
      .subscribe((result: Blob) => {
        const blob = new Blob([result], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); // you can change the type
        const url = window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");

        anchor.download = "bao-cao-don-hang.xlsx";
        anchor.href = url;
        anchor.click();
      });
  }

  openMediaEnter(vehicle: string) {
    this.volumeStatus = 'ON';
    this.playAudio('../../../../../assets/AudioNormal/audio_generer/moixe.wav');
    this.callLicensePlate(vehicle);
    setTimeout(() => {
      this.playAudio('../../../../../assets/AudioNormal/audio_generer/vaonhanhang.wav');
    }, 4800)
    this.volumeStatus = 'OFF';
  }

  openMediaOut(vehicle: string) {
    this.volumeStatus = 'ON';
    this.playAudio('../../../../../assets/AudioNormal/audio_generer/moixe.wav');
    this.callLicensePlate(vehicle);
    setTimeout(() => {
      this.playAudio('../../../../../assets/AudioNormal/audio_generer/roikhoiban.wav');
    }, 4800)
    this.volumeStatus = 'OFF';
  }

  callLicensePlate(vehicle: string) {
    var lstVoice = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'S', 'T', 'U', 'V', 'W', 'R', 'W', 'X', 'W', 'Z']
    setTimeout(() => {
      for (let j = 0; j < lstVoice.length; j++) {
        const element = lstVoice[j];
        for (let index = 0; index < vehicle.length; index++) {
          if (vehicle[index] == element) {
            setTimeout(() => {
              this.playAudio(`../../../../../assets/AudioNormal/${lstVoice[j]}.wav`);
            }, index * 500)
          }
        }
      }
    }, 800);
  }

  playAudio(url: string) {
    var audio = new Audio(url);
    audio.play();
  }

  showListDriver() {
    const dialogRef = this.dialog.open(DriverDialogComponent);
    dialogRef.componentInstance.orderSelected = this.itemSelected;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.code === 200) {
          this.toastr.showSuccess(result.message);
          this.Pagingdata(this.PageInfo);
        }
        else {
          this.toastr.showError(result.message);
        }
      }
    })
  }

  acceptOrder() {
    this.orderOperatingService.acceptOrder({ id: this.itemSelected.id, driverUserName: this.itemSelected })
  }

  cancelOrder() {
    if (!this.itemSelected.driverUserName) {
      const dialogRef = this.dialog.open(PopupComponent);
      dialogRef.componentInstance.title = `Đơn hàng này chưa có người nhận !`;
      return;
    }
    const dialogRef = this.dialog.open(PopupComponent);
    dialogRef.componentInstance.title = "Bạn có chắc chắn muốn huỷ đơn không?";
    dialogRef.componentInstance.btnSubmit = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'submit') {
        this.orderOperatingService.cancelOrder({ id: this.itemSelected.id, driverUserName: this.itemSelected.driverUserName }).subscribe(res => {
          if (res) {
            if (res.code === 200) {
              this.toastr.showSuccess(res.message);
              this.Pagingdata(this.PageInfo);
            }
            else {
              this.toastr.showError(res.message);
            }
          }
        })
      }
    })
  }

  finishOrder() {
    if (!this.itemSelected.driverUserName) {
      const dialogRef = this.dialog.open(PopupComponent);
      dialogRef.componentInstance.title = `Đơn hàng này chưa có người nhận !`;
      return;
    }
    const dialogRef = this.dialog.open(PopupComponent);
    dialogRef.componentInstance.title = "Bạn có chắc chắn muốn kết thúc đơn hàng?";
    dialogRef.componentInstance.btnSubmit = true;
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'submit') {
        this.orderOperatingService.finishOrder({ id: this.itemSelected.id, driverUserName: this.itemSelected.driverUserName, noteFinish: "đã kết thúc đơn hàng" }).subscribe(res => {
          if (res) {
            if (res.code === 200) {
              this.toastr.showSuccess(res.message);
              this.Pagingdata(this.PageInfo);
            }
            else {
              this.toastr.showError(res.message);
            }
          }
        })
      }
    })
  }
}
