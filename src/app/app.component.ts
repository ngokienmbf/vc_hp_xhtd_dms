import { SignalrService } from './Service/signalr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'V1';
  constructor(private signalrService: SignalrService) { }
  ngOnInit(): void {
    this.signalrService.initiateSignalrConnection();
    let userInfo = JSON.parse(localStorage.getItem('UserInfo') || '')
    if (userInfo.accessToken) {
      console.log('aaaaaaaaaa')
    }
    // localStorage.getItem('UserInfo')
  }
}
