import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignalrService {
  URL_SIGNALR = 'http://45.124.94.191:8789/xhtdmsg';
  EVENT_MESSAGE = 'SendMsgToUser';
  hubUrl: string = '';
  connection: any;
  hubMessage: BehaviorSubject<string>;

  constructor() {
    this.hubUrl = this.URL_SIGNALR;
    this.hubMessage = new BehaviorSubject<string>('');
  }

  public async initiateSignalrConnection(): Promise<void> {
    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(this.hubUrl)
        .withAutomaticReconnect()
        .build();

      await this.connection.start();
      this.setSignalrClientMethods()

      console.log(`SignalR connection success! connectionId: ${this.connection.connectionId}`);
    }
    catch (error) {
      console.log(`SignalR connection error: ${error}`);
    }
  }

  private setSignalrClientMethods(): void {
    this.connection.on(this.EVENT_MESSAGE, (message: string) => {
      this.hubMessage.next(message);
    });
  }
}
