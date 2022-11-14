import { RfidService } from './../../../../Service/rfid.service';
import { rfid } from './../../../../Model/Rfid';
import { RfidSignService } from './../../../../Service/rfidSign.service';
import { Vehicle, lstVehicle } from 'src/app/Model/Vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/Service/vehicle.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Pagination } from 'src/app/Model/Table';

@Component({
  selector: 'app-rfid-dialog',
  templateUrl: './rfid-dialog.component.html',
  styleUrls: ['./rfid-dialog.component.css']
})
export class RfidDialogComponent implements OnInit {

  loading: boolean = true;
  lstdata: lstVehicle = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
    data: []
  };
  itemSelected: string = '';
  contImageId: number = 0;
  rfidSelected: rfid | null = null;
  Pagination: Pagination = {
    currentPage: 0,
    pageSize: 0,
    totalRecord: 0,
    totalPage: 0,
  };

  PageInfo = {
    page: 1,
    Keyword: '',
    pageSize: 10,
    startDate: '',
    endDate: ''
  }


  constructor(private vehicleService: VehicleService, private rfidService: RfidService,
    public dialogRef: MatDialogRef<RfidDialogComponent>) { }

  ngOnInit(): void {
    this.loadData(this.PageInfo);
  }

  loadData(PageInfo: any) {
    this.loading = true;
    this.vehicleService.GetVehiclesNoRfid(this.PageInfo.page, this.PageInfo.Keyword, this.PageInfo.pageSize).subscribe(data => {
      this.loading = false;
      this.lstdata = data;
      this.Pagination.currentPage = data.currentPage,
        this.Pagination.pageSize = data.pageSize,
        this.Pagination.totalPage = data.totalPage,
        this.Pagination.totalRecord = data.totalRecord
    })
  }

  onSearch(e: any) {
    this.PageInfo.Keyword = e;
    this.PageInfo.page = 1;
    this.loadData(this.PageInfo);
  }

  onChangePage(pageOfItems: any) {
    pageOfItems.Keyword = this.PageInfo.Keyword;
    pageOfItems.startDate = this.PageInfo.startDate;
    pageOfItems.endDate = this.PageInfo.endDate;
    this.PageInfo = pageOfItems
    this.loadData(pageOfItems)
  }

  hanldeClickItem(item: string) {
    this.itemSelected = item;
  }

  closeDialog() {
    this.dialogRef.close()
  }

  handleSubmit() {
    this.loading = true;
    this.rfidService.AssignVehicle({id: this.rfidSelected?.id, vehicle: this.itemSelected}).subscribe(res => this.dialogRef.close(res));
  }

}
