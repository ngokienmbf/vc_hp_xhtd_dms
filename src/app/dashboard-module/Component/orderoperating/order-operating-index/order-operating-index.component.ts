import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-operating-index',
    templateUrl: './order-operating-index.component.html',
    styleUrls: ['./order-operating-index.component.css']
})
export class OrderOperatingIndexComponent implements OnInit {
    loading: boolean = false;
    selected: number = 0;
    constructor() { }

    ngOnInit(): void {
    }

    myTabSelectedIndexChange(index: number) {
        this.selected = index;
    }

}
