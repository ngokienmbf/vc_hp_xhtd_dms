import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/Service/device.service';
import { CategoryService } from 'src/app/Service/category.service';
import { Item } from 'src/app/Model/multidropdown';
import { Category } from 'src/app/Model/Category';
import { Device } from 'src/app/Model/Device';
@Component({
  selector: 'app-device-board',
  templateUrl: './device-board.component.html',
  styleUrls: ['./device-board.component.css']
})
export class DeviceBoardComponent implements OnInit {
  loadding: boolean = false;
  constructor(private DeviceService: DeviceService,private CategoryService: CategoryService) { }
  deviceList: Device[] = [];
  categoryList: Category[] = [];
  ngOnInit(): void {

    this.CategoryService.GetAllFullForList().subscribe((data) => {
      this.categoryList = data;
    });
    // this.DeviceService.GetAllFull().subscribe((data) => {
    //   this.deviceList = data;
    // });
  }

}
