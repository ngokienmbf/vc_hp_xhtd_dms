import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weight-station-index',
  templateUrl: './weight-station-index.component.html',
  styleUrls: ['./weight-station-index.component.css']
})
export class WeightStationIndexComponent implements OnInit {

  loading: boolean = false;
  selected: number = 0;
  lstdata: any[] = [] ;
  constructor() { }

  ngOnInit(): void {
  }


  myTabSelectedIndexChange(index: number) {
    this.selected = index;
  }
}
