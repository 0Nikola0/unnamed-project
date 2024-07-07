package com.unnamedproject.backend.dtos;

import lombok.Data;

import java.text.SimpleDateFormat;

@Data
public class EngineQueryDto {

    private Long userId;
    private String chatId;
    private String content;
    private String sent_at;

    public EngineQueryDto(Long userId, String chatId, String content) {
        this.userId = userId;
        this.chatId = chatId;
        this.content = content;
        this.sent_at = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());
    }
}
