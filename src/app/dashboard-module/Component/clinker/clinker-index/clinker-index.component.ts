import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinker-index',
  templateUrl: './clinker-index.component.html',
  styleUrls: ['./clinker-index.component.css']
})
export class ClinkerIndexComponent implements OnInit {
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
