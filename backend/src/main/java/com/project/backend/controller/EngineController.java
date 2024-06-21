package com.project.backend.controller;

import com.project.backend.model.dto.MessageDto;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/engine")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000"})
public class EngineController {

//    @PostMapping("/query")
    @GetMapping("/query")
    public String quergine() {
        System.out.println("EOEOEOEO\n\n");

        return "asdad";
        //        String url = "http://127.0.0.1:8000/engine/query";
//        RestTemplate restTemplate = new RestTemplate();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<MessageDto> requestEntity = new HttpEntity<>(messageDto, headers);
//
//        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
//        String result = response.getBody();
//
//        System.out.println(result);
//        return result;
    }
}
