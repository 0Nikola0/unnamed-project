package com.unnamedproject.backend.controllers;

import com.unnamedproject.backend.dtos.UserDto;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    private String chatBaseUrl = "http://127.0.0.1:8000/chats";

    @GetMapping("/get_all")
    public String GetAllChatsForUser(Authentication auth) {
        if (auth.getPrincipal() instanceof UserDto) {
            UserDto userDto = (UserDto) auth.getPrincipal();
            Long userId = userDto.getId();

            String baseUrl = chatBaseUrl + "/get_all";
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .queryParam("user_id", userId);
            String url = uriBuilder.toUriString();

            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject(url, String.class);

            return result;
        }
        return null;
    }

    @GetMapping("/get")
    public String GetChatById(@RequestParam String chatId, Authentication auth){
        if (auth.getPrincipal() instanceof UserDto) {
            UserDto userDto = (UserDto) auth.getPrincipal();
            Long userId = userDto.getId();

            String baseUrl = chatBaseUrl + "/get";
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .queryParam("chat_id", chatId)
                    .queryParam("user_id", userId);
            String url = uriBuilder.toUriString();

            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject(url, String.class);

            return result;
        }
        return null;
    }

    @GetMapping("/delete")
    public String DeleteChatById(@RequestParam String chatId, Authentication auth){
        if (auth.getPrincipal() instanceof UserDto) {
            UserDto userDto = (UserDto) auth.getPrincipal();
            Long userId = userDto.getId();

            String baseUrl = chatBaseUrl + "/delete";
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(baseUrl)
                    .queryParam("chat_id", chatId)
                    .queryParam("user_id", userId);
            String url = uriBuilder.toUriString();

            RestTemplate restTemplate = new RestTemplate();
            String result = restTemplate.getForObject(url, String.class);

            return result;
        }
        return null;
    }
}

