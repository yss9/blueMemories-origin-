package com.spring.container.spring.controllers;

import com.spring.container.spring.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api")
public class RecommendController {

    @Autowired
    private RecommendService recommendService;

//    @PostMapping("/chat")
//    public Mono<String> chat(@RequestBody ChatRequest chatRequest) {
//        return openAIService.getChatResponse(chatRequest.getPrompt());
//    }

    @GetMapping("/test")
    public String test(){
        LocalDate today = LocalDate.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String formattedDate = today.format(formatter);

        return formattedDate;
    }
}
