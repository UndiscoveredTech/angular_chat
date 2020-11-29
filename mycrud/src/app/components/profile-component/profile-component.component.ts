import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.css']
})
export class ProfileComponent implements OnInit {


  sender: string = '';
  sender_image: string = '';
  chatroomname: string = '';
  displayAddchatroom: boolean = false;
  profile_list = {
    name: "Ademi"
  };

  chatRoom_data = {
    name: '',
    owner: '',
    profiles: [

    ],

    webSocketChatMessage: [

    ]
  }

  add_chatRoom_data = {
    name: '',
    owner: '',
    profiles: [

    ],

    webSocketChatMessage: [

    ]
  }

  editprofile_chatRoom_data = {
    name: '',
    owner: '',
    profiles: [

    ],

    webSocketChatMessage: [

    ]
  }



  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  connect() {

  }


  getAllData() {

    this.http.get<any>("http://localhost:8080/profilelist").subscribe({
      next: data => {
        this.profile_list = data;
        console.log("-------MEEEEE : " + data);

      },
      error: error => {
        console.error('There was an error!', error);
      }
    })

    this.http.get<any>("http://localhost:8080/chatroom").subscribe({
      next: data => {
        this.chatRoom_data = data;
        console.log("-------MEEEEE1111 : " + data);

      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  postinServer() {
    this.http.post<any>("http://localhost:8080/addProfile", this.profile_list).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  displaytoAdd() {
    this.displayAddchatroom = true;
  }

  chatroomNameHandeler(e) {
    this.chatroomname = e.target.value

  }

  onCancle() {
    this.chatroomname = '';
    this.displayAddchatroom = false;

  }
  onAddChat() {
    if (this.add_chatRoom_data.name != '') {
      this.add_chatRoom_data.name = this.chatroomname;
      this.add_chatRoom_data.owner = this.sender;
      this.http.post<any>("http://localhost:8080/createChatRoom", this.add_chatRoom_data).subscribe({
        next: data => {
          if (data == true) {
            this.chatroomname = '';
            this.displayAddchatroom = false;

          }
        },
        error: error => {
          console.error('There was an error!', error);
        }
      })

      this.resolveAfter2Seconds(20).then(value => {
        this.getAllData();
      })
    }
  }


  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1500);
    });
  }



  onJointoChat(chatname) {
    this.getprofileIcon();
    this.http.get<any>(`http://localhost:8080/chatroom/${chatname}`).toPromise()
      .then((data) => {
        this.resolveAfter2Seconds(20).then(value => {
          this.editprofile_chatRoom_data = data;
          var count = 0;
          console.log("--PC2: " + this.sender_image);

          for (let i = 0; i < this.editprofile_chatRoom_data.profiles.length; i++) {

            console.log(JSON.parse(JSON.stringify(this.editprofile_chatRoom_data.profiles[i])).name, "-----------" + this.sender);

            if (JSON.parse(JSON.stringify(this.editprofile_chatRoom_data.profiles[i])).name == this.sender) {
              count++;
            }
          }
          if (count == 0) {
            console.log("--PC2: " + this.sender_image);

            var pro = {
              name: this.sender,
              profile_icon: this.sender_image
            }
            this.editprofile_chatRoom_data.profiles.push(pro);
            //this.editprofile_chatRoom_data.profiles.push(this.sender)

            this.http.put<any>(`http://localhost:8080/editByName/profilelist/${chatname}`, this.editprofile_chatRoom_data).subscribe({
              next: data => {
                console.log("----OUTPUT : " + data);

              },
              error: error => {
                console.error('There was an error!', error);
              }

            })
          }
        })

      })
      .catch((error) => console.log("Error", error));
  }


  //return profile icon

  getprofileIcon() {
    this.http.get<any>(`http://localhost:8080/profile/byname/${this.sender}`).subscribe({
      next: data => {
        console.log("REGISTER DATA: ===== ", data);
        this.sender_image = data.profile_icon;
        console.log("--PC: " + this.sender_image);



      },
      error: error => {
        console.error('There was an error!', error);
      }

    })
  }
  // 
  ngOnInit(): void {
    this.getAllData();
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.sender = params['name'];

      }
    )
    console.log("--------: " + this.sender)

  }

}

