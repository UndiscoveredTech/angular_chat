import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  readonly uri: string = "ws://localhost:8081";
  constructor() {
    this.socket = io(this.uri);
   }

  socket: any;
  listen(eventName: string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data) =>{
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any){
    this.socket.emit(eventName,data);
  }
}
