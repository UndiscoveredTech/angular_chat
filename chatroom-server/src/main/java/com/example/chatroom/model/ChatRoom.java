package com.example.chatroom.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatroom_db")

public class ChatRoom {

    @Id
    private String _id;
    private String name;
    private String owner;
    private Profile[] profiles;
    private WebSocketChatMessage[] webSocketChatMessage;

    public ChatRoom() {
    }

    public ChatRoom(String name,String owner,Profile[] profiles, WebSocketChatMessage[] webSocketChatMessage) {
        this.name = name;
        this.owner = owner;
        this.profiles = profiles;
        this.webSocketChatMessage = webSocketChatMessage;
    }

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public WebSocketChatMessage[] getWebSocketChatMessage() {
        return webSocketChatMessage;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setWebSocketChatMessage(WebSocketChatMessage[] webSocketChatMessage) {
        this.webSocketChatMessage = webSocketChatMessage;
    }

    public Profile[] getProfiles() {
        return profiles;
    }

    public void setProfiles(Profile[] profiles) {
        this.profiles = profiles;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
}
