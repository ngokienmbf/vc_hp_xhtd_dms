import { Component, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from 'src/app/Service/device.service';
import { CategoryService } from 'src/app/Service/category.service';
import { Category } from 'src/app/Model/Category';
import { Device } from 'src/app/Model/Device';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-device-board',
  templateUrl: './device-board.component.html',
  styleUrls: ['./device-board.component.css']
})
export class DeviceBoardComponent implements OnInit {
  loadding: boolean = false;
  constructor(private DeviceService: DeviceService,private CategoryService: CategoryService) { }
  categoryList: Category[] = [];
  
  @ViewChild(MatAccordion) accordion: MatAccordion;

  ngOnInit(): void {
    this.CategoryService.GetFullForList().subscribe((data) => {
      this.categoryList = data;
    });
  }

  step = 0;
  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
