import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/MessageService';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { UploadFileService } from '../../UploadFileService';




@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input()
  varName: string;
  messages: string[] = [];
  mymessages: string[] = [];
  todisplay_mymessages: string[] = [];

  singlemessage: string = '';

  chatroomname: string = '';
  ownername: string = '';

  // IMAGE FILE
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;


  placeholder: string = '';

  chatRoom_data = {
    name: '',
    owner: '',
    profiles: [

    ],

    webSocketChatMessage: [

    ]
  };


  constructor(private http: HttpClient, private messageService: MessageService, private activatedRoute: ActivatedRoute, private uploadService: UploadFileService) {
  }
  connect() {
    this.messageService.connect(this.varName);

  }
  messageHandler(e) {
    this.singlemessage = e.target.value;
    console.log(this.singlemessage);

  }

  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1500);
    });
  }
  sendName() {

    if (this.singlemessage != '' && this.selectedFile == null) {
      if (this.selectedFile == null) {
        this.messageService.sendName(this.ownername, this.chatroomname, this.singlemessage, "image-null");
      }
      else {
        this.messageService.sendName(this.ownername, this.chatroomname, this.singlemessage, this.selectedFile.item(0).name);
      }
      //var temp_message: string[] = [];
      this.resolveAfter2Seconds(20).then(value => {

        for (let i = 0; i < this.messageService.objectData.length; i++) {
          console.log("pp- ", this.messageService.objectData[1]);

          if (this.messageService.objectData[i].chatname == this.chatroomname) {
            this.mymessages = this.messageService.objectData[i].messagelist;
            break;
          }
        }
      })
      this.posttoServer();
      this.upload();
      this.singlemessage = '';
    }


  }
  posttoServer() {

    var file: string = "";
    if (this.selectedFile == null) {
      file = "no-image";
    }
    else
      file = this.selectedFile.item(0).name;
    var outputArray =
    {
      destination: this.chatroomname,
      content: this.singlemessage,
      sender: this.ownername,
      image: file

    };

    this.http.get<any>(`http://localhost:8080/chatroom/${this.chatroomname}`).toPromise()
      .then((data) => {
        this.chatRoom_data = data;
        this.chatRoom_data.webSocketChatMessage.push(outputArray);

        this.http.put<any>(`http://localhost:8080/editByName/messagelist/${this.chatroomname}`, this.chatRoom_data).subscribe({
          next: data => {
            console.log("----OUTPUT : " + data);

          },
          error: error => {
            console.error('There was an error!', error);
          }

        })

      })
      .catch((error) => console.log("Error", error));



  }

  getAllData() {
    this.messages = [];

    this.http.get<any>(`http://localhost:8080/chatroom/${this.chatroomname}`).toPromise()
      .then((data) => {
        this.chatRoom_data = JSON.parse(JSON.stringify(data));
        console.log("*****: ", this.chatRoom_data);

        for (let i = 0; i < this.chatRoom_data.webSocketChatMessage.length; i++) {
          var that = this;
          // let data = {
          //   destination :  this.chatRoom_data.webSocketChatMessage[i].destination,
          //   content:  this.chatRoom_data.webSocketChatMessage[i].content,
          //   sender: this.chatRoom_data.webSocketChatMessage[i].sender
          // }
          this.messages[i] = this.chatRoom_data.webSocketChatMessage[i];
          //this.messageService.messages[i] = data;

        }
      })
      .catch((error) => console.log("Error", error));

  }



  deleteAllProfiles() {

    this.http.delete<any>("http://localhost:8080/deleteallProfiles").toPromise()
      .then((data) => {
        this.chatRoom_data = JSON.parse(JSON.stringify(data[0]));
        console.log("---------: LENGTH Message: " + this.chatRoom_data.webSocketChatMessage.length);
        console.log("---------: DATA IN GETALL: ", this.chatRoom_data);


        for (let i = 0; i < this.chatRoom_data.webSocketChatMessage.length; i++) {
          var that = this;
          let data = JSON.stringify({
            destination: this.chatRoom_data.webSocketChatMessage[i].destination,
            content: this.chatRoom_data.webSocketChatMessage[i].content,
            sender: this.chatRoom_data.webSocketChatMessage[i].sender,

          })
          this.messages[i] = data;
          this.messageService.messages[i] = data;
        }
      })
      .catch((error) => console.log("Error", error));

  }


  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    if (this.selectedFile != null) {
      this.progress.percentage = 0;
      this.uploadService.pushFileToStorage(this.selectedFile.item(0)).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          alert('File Successfully Uploaded');
        }
        this.selectedFile = undefined;
      }
      );
    }
    //this.selectedFiles = null;
  }
  selectFile(event) {
    this.selectedFile = event.target.files;
    console.log("JJJJJJJJJJJJJ--->>: ", this.selectedFile.item(0));

  }
  ngOnInit() {

    this.connect();
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.chatroomname = params['name'];
        this.ownername = params['sender'];
      }
    )

    this.getAllData();
    this.placeholder = this.chatroomname;
    console.log(this.varName);
    //this.placeholder = this.varName;

    console.log("GGGGGGGGGGGGGGGGGG");


  }

}
