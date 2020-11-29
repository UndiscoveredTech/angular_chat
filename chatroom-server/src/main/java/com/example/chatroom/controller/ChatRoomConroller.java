package com.example.chatroom.controller;

import com.example.chatroom.model.ChatRoom;
import com.example.chatroom.model.Profile;
import com.example.chatroom.repository.ChatRoomRepository;
import com.example.chatroom.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatRoomConroller {

    @Autowired
    private ChatRoomRepository chatRoomRepository;
    public ChatRoomConroller(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }


    @GetMapping("/chatroom")
    public List<ChatRoom> getChatRoom(){
        return chatRoomRepository.findAll();
    }

    @GetMapping("/chatroom/{name}")
    public ChatRoom getChatroomByname(@PathVariable(value = "name") String name)
    {
        if(findbyname(name)!=null){
            return findbyname(name);
        }
        else
            return null;
    }

    @PostMapping("/addToChatroom")
    public String addToChatroom(@RequestBody ChatRoom chatRoom){
        //List<Profile> listofAllprofiles = getAllCamera();
//        int count = 0;
//        for(int i = 0;i<listofAllcamera.size();i++){
//            if(listofAllcamera.get(i).getIP().equals(cameraModel.getIP())){
//                count++;
//
//            }
//        }
//        if (count == 0){
        this.chatRoomRepository.save(chatRoom);
        //}
        return "Add";
    }


    @PostMapping("/createChatRoom")
    public boolean addProfile(@RequestBody ChatRoom chatModel){
        List<ChatRoom> listofAllchatroom = getChatRoom();
        int count = 0;
        for(int i = 0;i<listofAllchatroom.size();i++){
            if(listofAllchatroom.get(i).getName().equals(chatModel.getName())){
                count++;
                return false;
            }
        }
        if (count == 0){
            chatRoomRepository.save(chatModel);
        }
        return true;
    }


    @PutMapping("/editByName/messagelist/{name}")
    public ChatRoom editChatmessages(@PathVariable(value = "name") String name,@RequestBody ChatRoom chatRoom){

        ChatRoom cm = findbyname(chatRoom.getName());
        ChatRoom updated = cm;
        //updated.setName(cameraModel.getName());
        //updated.setModel(cameraModel.getModel());
        //updated.setResolution(cameraModel.getResolution());
        //updated.setIP(cameraModel.getIP());
        updated.setWebSocketChatMessage(chatRoom.getWebSocketChatMessage());

//        List<CameraModel> listofAllcamera = getAllCamera();
//        int count = 0;
//        for(int i = 0;i<listofAllcamera.size();i++){
//            if(listofAllcamera.get(i).getIP().equals(cameraModel.getIP())){
//                count++;
//
//            }
//        }
        //if (count == 0){
            chatRoomRepository.save(updated);
        //}
        return null;

    }


    @PutMapping("/editByName/profilelist/{name}")
    public ChatRoom editChatprofilelist(@PathVariable(value = "name") String name,@RequestBody ChatRoom chatRoom){

        ChatRoom cm = findbyname(chatRoom.getName());
        ChatRoom updated = cm;
        //updated.setName(cameraModel.getName());
        //updated.setModel(cameraModel.getModel());
        //updated.setResolution(cameraModel.getResolution());
        //updated.setIP(cameraModel.getIP());
        //updated.setWebSocketChatMessage(chatRoom.getWebSocketChatMessage());

        updated.setProfiles(chatRoom.getProfiles());

//        List<CameraModel> listofAllcamera = getAllCamera();
//        int count = 0;
//        for(int i = 0;i<listofAllcamera.size();i++){
//            if(listofAllcamera.get(i).getIP().equals(cameraModel.getIP())){
//                count++;
//
//            }
//        }
        //if (count == 0){
        chatRoomRepository.save(updated);
        //}
        return null;

    }
    public ChatRoom findbyname(String name){
        //System.out.println(name);
        Optional<ChatRoom> profileModel = chatRoomRepository.findAll().stream().filter(profile -> profile.getName().equals(name)).findFirst();
        if(profileModel != null)
            return profileModel.get();
        return null;
    }

}
