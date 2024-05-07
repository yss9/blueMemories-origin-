package com.spring.container.spring.controllers;

import com.spring.container.spring.service.ImageGenerationService;
import com.spring.container.spring.service.TranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class TranslateController {
    @Autowired
    private TranslationService translationService;

    @Autowired
    public TranslateController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping("/translate")
    public Mono<Map<String, String>> translate(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");  // 요청에서 "prompt" 필드 값 추출
        return translationService.translateText(prompt)
                .map(translatedText -> Map.of("translatedText", translatedText));  // 응답을 Map 형태로 반환
    }
}
