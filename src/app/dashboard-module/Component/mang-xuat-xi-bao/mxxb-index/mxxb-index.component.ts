import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mxxb-index',
  templateUrl: './mxxb-index.component.html',
  styleUrls: ['./mxxb-index.component.css']
})
export class MxxbIndexComponent implements OnInit {
  loading: boolean = false;
  selected: number = 0;
  lstdata: any[] = [] ;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  myTabSelectedIndexChange(index: number) {
    this.selected = index;
  }

}



