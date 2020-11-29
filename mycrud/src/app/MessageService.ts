import { Injectable } from '@angular/core';
export var myvar:string = '';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
  })

  
export  class MessageService {

  //Object for storing messages


  objectData: any[] = [
    {
      chatname:'',
      messagelist: [

      ],
    },
  ];
  teststr: string[] = [];
  messages: string[] = [];
  showConversation: boolean = true;
  ws: any;
  name: string;
  disabled: boolean;

  message_send: string;
  status: string[] = [];
  before_chat_visible: boolean =  true;

  placeholder:string = '';

  name_varname: string = '';


  // 

  chatRoom_data = {
    "name":"ChatRoom-Adem",
    "webSocketChatMessage":[
      {
        "destination":"type",
      "content":"-----",
      "sender":"Sender"
      },
      {
        "destination":"type1",
      "content":"-----1",
      "sender":"Sender1"
      }
    ]
  };
      constructor(private http:HttpClient) {
        
        //this.initializeWebSocketConnection();
        //this.that = this;
    }


    connect(name:string) {
     this.name_varname = name;
      this.before_chat_visible = false;
      let socket = new SockJS("http://localhost:8080/websocketApp");
      this.ws = Stomp.over(socket);
      let that = this;
      this.ws.connect({}, function(frame) {
        that.ws.subscribe("/topic/javainuse", function(message){
          console.log("------------MEE:**  " , JSON.parse(message.body).destination);
          let count = 0;
          console.log("LENGTH: "+ that.teststr.length);
          console.log("LENGTH: "+ that.objectData.length);
          
          for(let i = 0;i<that.objectData.length;i++){
            if(that.objectData[i].chatname == JSON.parse(message.body).destination){
              count++;
              let data = {
                sender : JSON.parse(message.body).sender,
                destination : JSON.parse(message.body).destination,
                content: JSON.parse(message.body).content,
                image:JSON.parse(message.body).imagepath
              }
              that.objectData[i].messagelist.push(data);
              break;
            }
            
          }

          if(count == 0){
            let data = {
              sender : JSON.parse(message.body).sender,
              destination : JSON.parse(message.body).destination,
              content: JSON.parse(message.body).content,
              image:JSON.parse(message.body).imagepath
            }
            let chatname1 = JSON.parse(message.body).destination;
            
            let newdata = {
              chatname: chatname1,
              messagelist: [data]
            }
            that.objectData.push(JSON.parse(JSON.stringify(newdata)));
            //that.objectData.messagelist.push(JSON.parse(JSON.stringify(newdata)));

            //messagelist: data

            
          }
          // var messageDATA = {
            
          // }
          //that.messages.push(JSON.parse(message.body));
          
        });
  
          
  
        that.disabled = true;
      }, function(error) {
        alert("STOMP error " + error);
      });
    }
  
    disconnect() {
      if (this.ws != null) {
        this.ws.ws.close();
      }
      this.setConnected(false);
        console.log("Disconnected");
    }
  
    sendName(sender,destination,content,imagepath) {

      let data = JSON.stringify({
        sender : sender,
        destination : destination,
        content: content,
        image:imagepath
      })
      this.ws.send("/app/chat.sendMessage", {}, data);
    }
  
    showUserConnected(message) {
      this.showConversation = true;
      //this.messages.push(message)
    }
  
    setConnected(connected) {
      this.disabled = connected;
      this.showConversation = connected;
      this.messages = [];
    }


    getAllData(){
    
      this.http.get<any>("http://localhost:8080/chatroom").subscribe({
        next: data => {
          this.chatRoom_data = data[0];
            console.log("----------: ", data[0]);
            
        },
        error: error => {
              console.error('There was an error!', error);
        }
    })
  }
      ngOnInit() {

        this.getAllData();

    for(let i = 0;i<this.chatRoom_data.webSocketChatMessage.length;i++)
    {
      var that = this;
      let data = JSON.stringify({
        sender: this.chatRoom_data.webSocketChatMessage[i].sender,
        destination :  this.chatRoom_data.webSocketChatMessage[i].destination,
        content:  this.chatRoom_data.webSocketChatMessage[i].content
      })
      this.messages[i] = data;
    }
    console.log("------IAM HERE:" +this.messages.length);
      
        
      }
  }
  
