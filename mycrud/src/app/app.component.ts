import { Component,OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
export var USERNAME;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mycrud';

  disabled: boolean;

  public  data:string = '';
  connect_data = {
    name: ''

  }
  register_data = {
    name: '',
    profile_icon: ''
  }
  before_chat_visible: boolean =  true;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  //input name Handler
  onNameHandler(e){
    this.connect_data.name = e.target.value;
    console.log("NAME: "+ this.connect_data.name);
    USERNAME = this.connect_data.name;
    
    
  }
  onRegisterHandler(e){
    this.register_data.name = e.target.value;
    console.log("NAME Register: "+ this.register_data.name);
    
  }
  connect() {
      this.http.get<any>(`http://localhost:8080/profile/${this.connect_data.name}`).subscribe({
      next: data => {
          console.log("REGISTER DATA: ===== " + data);
          if(data == true){

            this.before_chat_visible = false;
            this.disabled = true;
          }
         
          
      },
      error: error => {
          console.error('There was an error!', error);
      }
      
  })

  }

  register(){

    this.http.post<any>("http://localhost:8080/addProfile",JSON.parse(JSON.stringify(this.register_data))).subscribe({
      next: data => {
          console.log("REGISTER DATA: ===== " + data);
          if(data == true){

            this.before_chat_visible = false;
            this.disabled = true;
          }
         
          
      },
      error: error => {
          console.error('There was an error!', error);
      }
      
  })

  }


  //get image on click
  getimage(e){

    this.register_data.profile_icon = e.target.id;
    console.log("GET ID: ", this.register_data.profile_icon);
    
  }

}
