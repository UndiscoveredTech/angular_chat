package com.example.chatroom.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatroom_profile")
public class Profile {

    @Id
    private String _id;
    private String name;
    private String profile_icon;


    public Profile() {
    }

    public Profile(String name,String profile_icon) {
        this.name = name;
        this.profile_icon = profile_icon;
        //this.webSocketChatMessage = webSocketChatMessage;
    }

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfile_icon() {
        return profile_icon;
    }

    public void setProfile_icon(String profile_icon) {
        this.profile_icon = profile_icon;
    }
    //    public WebSocketChatMessage[] getWebSocketChatMessage() {
//        return webSocketChatMessage;
//    }
//
//    public void setWebSocketChatMessage(WebSocketChatMessage[] webSocketChatMessage) {
//        this.webSocketChatMessage = webSocketChatMessage;
//    }
}
