import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/Service/device.service';
import { CategoryService } from 'src/app/Service/category.service';
import { Category } from 'src/app/Model/Category';
import { Device } from 'src/app/Model/Device';
import { ToastrcustomService } from 'src/app/Interceptor/toastrcustom';
import { SignalrService } from './../../../../Service/signalr.service';

@Component({
  selector: 'app-device-control',
  templateUrl: './device-control.component.html',
  styleUrls: ['./device-control.component.css']
})

export class DeviceControlComponent implements OnInit {
  loadding: boolean = false;
  constructor(private toastr : ToastrcustomService,private DeviceService: DeviceService,private CategoryService: CategoryService,
    private signalrService: SignalrService) { }
  
  //categoryList: Category[] = [];
  countCategoryList: Category[] = [];

  countActiveCat: number = 0;
  countDeactiveCat: number = 0;
  countActiveDev: number = 0;
  countDeactiveDev: number = 0;
  
  ngOnInit(): void {
    this.countActiveCat = 0;
    this.countDeactiveCat  = 0;
    this.countActiveDev  = 0;
    this.countDeactiveDev = 0;
    this.countCategoryList = [];
    
    this.CategoryService.GetFullForList().subscribe((data) => {
      //this.categoryList = data;
      
      // count hạng mục, thiết bị
      data.forEach(cat=>{
        let i = this.countCategoryList.push(cat)-1;
        this.countCategoryList[i]._countActiveDevices=0;
        this.countCategoryList[i]._countDeactiveDevices=0;
        if (cat.state){
          this.countActiveCat++;
        }else {
          this.countDeactiveCat++;
        }
        
        cat.devices.forEach(dev=>{
          console.log(dev.name);
          if (dev.state){
            this.countActiveDev++;
            this.countCategoryList[i]._countActiveDevices++;
          }else {
            this.countDeactiveDev++;
            this.countCategoryList[i]._countDeactiveDevices++;
          }
        })
      })
      console.log(this.countCategoryList);
    });

    // get Message
    this.signalrService.hubMessage.subscribe((hubMessage: string) => {
      this.getPingChange(hubMessage);
    });
  }

  changeState(type:number, id: number, state: boolean) {
    let Edit = {
      id :id,
      state: state
    }

    if (type==1) {
      this.CategoryService.UpdateState(Edit as Category).subscribe(result => {
        if(result){
          if(result.succeeded === true){
            this.toastr.showSuccess(result.message);
            this.ngOnInit();
          }
          else
          {
            this.toastr.showError(result.message);
          }
        }
    });
    } else if (type==2) {
      this.DeviceService.UpdateState(Edit as Device).subscribe(result => {
          if(result){
            if(result.succeeded === true){
              this.toastr.showSuccess(result.message);
              this.ngOnInit();
            }
            else
            {
              this.toastr.showError(result.message);
            }
          }
      });
    } 
  } //end changestate

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

  getPingChange(hubMessage: any) {
    setTimeout(() => {
      if (!hubMessage) {
        return;
      }
      hubMessage = JSON.parse(hubMessage);
      if (hubMessage.FromService === 'XXX?') {
        //
      }
    }, 300)
  }
}
