package com.example.chatroom.repository;

import com.example.chatroom.model.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRoomRepository extends MongoRepository<ChatRoom,Integer> {
}
