import { Component,OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
  constructor(private http:HttpClient,private router : Router){}
  ngOnInit(): void {
    console.log("oo-"+ this.router.url);
// if(this.router.url != "/"){
//   this.before_chat_visible = false;
//   this.disabled = true;

// }
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

   if(this.register_data.name != '' && this.register_data.profile_icon != ''){
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

  }
  //get image on click
  getimage(e){

    this.register_data.profile_icon = e.target.id;
    console.log("GET ID: ", this.register_data.profile_icon);
    var str = "PngItem_1";
    for(let i = 0;i<4;i++){
      var l = i;
      var str_ = str.replace("1", ""+(i+1)+"");
      console.log(str_);
      
      document.getElementById(str_).style.border = "none";

    }
    document.getElementById(e.target.id).style.border = "1px solid #0000FF";

    
    

    
  }

  

}
