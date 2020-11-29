package com.example.chatroom.repository;

import com.example.chatroom.model.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<Profile,Integer> {
}
