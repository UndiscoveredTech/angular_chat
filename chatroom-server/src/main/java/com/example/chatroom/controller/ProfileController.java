package com.example.chatroom.controller;

import com.example.chatroom.model.Profile;
import com.example.chatroom.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProfileController {
    @Autowired
    private ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @RequestMapping("/")
    public String index(){
        return "adsfsadf";
    }

    @GetMapping("/profilelist")
    public List<Profile> getAllProfiles(){
        return profileRepository.findAll();
    }

    public Profile findbyname(String name){
        //System.out.println(name);
        Optional<Profile> profileModel = profileRepository.findAll().stream().filter(profile -> profile.getName().equals(name)).findAny();
        return profileModel.get();
    }
    @GetMapping("/profile/{name}")
    public boolean getCameraByname(@PathVariable(value = "name") String name)
    {
        if(findbyname(name)!=null){
            return  true;
        }
        else
            return false;
    }
    @GetMapping("/profile/byname/{name}")
    public Profile getProfileByname(@PathVariable(value = "name") String name)
    {
        if(findbyname(name)!=null){
            return  findbyname(name);
        }
        else
            return null;
    }

    @PostMapping("/addProfile")
    public boolean addProfile(@RequestBody Profile profileModel){
        List<Profile> listofAllprofiles = getAllProfiles();
       int count = 0;
        for(int i = 0;i<listofAllprofiles.size();i++){
            if(listofAllprofiles.get(i).getName().equals(profileModel.getName())){
                count++;
                return false;
            }
        }
        if (count == 0){
            profileRepository.save(profileModel);
        }
        return true;
    }

    @DeleteMapping("/deleteallProfiles")
    public void deleteallProfile(){
        //findbyname(name);

        //System.out.println(findbyname(name).getName());
        profileRepository.deleteAll();
        //cameraRepository.delete(findbyname(name));
    }

}
