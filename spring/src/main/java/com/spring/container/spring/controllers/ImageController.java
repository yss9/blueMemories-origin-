package com.spring.container.spring.controllers;

import com.spring.container.spring.service.ImageGenerationService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

public class ImageController {
    private final ImageGenerationService imageService;

    public ImageController(ImageGenerationService imageService) {
        this.imageService = imageService;
    }

    @GetMapping("/generate-image")
    public Mono<ResponseEntity<ByteArrayResource>> generateImage(@RequestParam String prompt) {
        return imageService.generateImage(prompt)
                .map(image -> ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(image))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}