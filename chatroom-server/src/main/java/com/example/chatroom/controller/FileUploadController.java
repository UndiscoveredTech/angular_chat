package com.example.chatroom.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.nio.file.Paths;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FileUploadController {

    List<String> files = new ArrayList<String>();
    Path path = FileSystems.getDefault().getPath("").toAbsolutePath();
    String pathstr = path.toString();
    private final Path rootLocation = Paths.get(pathstr+"\\assets");
    private final Path rootLocation1 = Paths.get( pathstr.replace("chatroom-server","")+"\\mycrud\\src\\assets");
    @PostMapping("/savefile")

    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        System.out.println("-----"+ path);
        System.out.println("00:"+pathstr + "--"+ pathstr.replace("chatroom-server","mycrud"));

        String message;
        System.out.println("-----------: "+ file);
        try {
            try {
                Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
                Files.copy(file.getInputStream(), this.rootLocation1.resolve(file.getOriginalFilename()));

            } catch (Exception e) {
                throw new RuntimeException("FAIL!");
            }
            files.add(file.getOriginalFilename());

            message = "Successfully uploaded!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Failed to upload!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

}