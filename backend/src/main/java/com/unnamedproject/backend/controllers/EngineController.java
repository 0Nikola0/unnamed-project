package com.unnamedproject.backend.controllers;

import com.unnamedproject.backend.dtos.EngineQueryDto;
import com.unnamedproject.backend.dtos.UserDto;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/engine")
public class EngineController {

    private final String engineBaseUrl;

    public EngineController(Environment env) {
        this.engineBaseUrl = env.getProperty("core.url") + "/engine";
    }

    @PostMapping("/query")
    public String quergine(@RequestBody EngineQueryDto queryDto, Authentication auth) {
        if (auth.getPrincipal() instanceof UserDto) {
            UserDto userDto = (UserDto) auth.getPrincipal();
            Long userId = userDto.getId();

            queryDto.setUserId(userId);

            String url = engineBaseUrl + "/query";
            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<EngineQueryDto> requestEntity = new HttpEntity<>(queryDto, headers);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
            String result = response.getBody();

            System.out.println(result);
            return result;
        }
        return null;
    }
}
