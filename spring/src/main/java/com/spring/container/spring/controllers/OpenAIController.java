package com.spring.container.spring.controllers;// OpenAIController.java
import com.spring.container.spring.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class OpenAIController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/chat")
    public Mono<String> chat(@RequestBody String prompt) {
        return openAIService.getChatResponse(prompt);
    }
}
