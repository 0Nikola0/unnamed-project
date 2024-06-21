package com.project.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8000"})
public class ChatController {

    @GetMapping("/get_all")
    public String queryEngine(@RequestParam String user_id) {
        String baseUrl = "http://127.0.0.1:8000/chats/get_all";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("user_id", user_id);
        String url = uriBuilder.toUriString();

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        
        return result;
    }

}
