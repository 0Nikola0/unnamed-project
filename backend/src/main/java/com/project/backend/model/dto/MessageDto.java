package com.project.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDto {
    public String chat_id;
    public String user_id;
    public String content;
}
