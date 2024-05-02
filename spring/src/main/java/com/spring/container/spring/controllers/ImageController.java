package com.spring.container.spring.controllers;

import com.spring.container.spring.repository.DiaryRepository;
import com.spring.container.spring.repository.ImageGenerationRepository;
import com.spring.container.spring.service.ImageGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping(value = "/api", method = RequestMethod.POST)
public class ImageController {

    private final ImageGenerationService imageService;

    @Autowired
    public ImageController(ImageGenerationService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/generate-image")
    public Mono<ResponseEntity<ByteArrayResource>> generateImage(@RequestPart("prompt") String prompt, @RequestPart("style_preset") String style) {
        return imageService.generateImage(prompt, style)
                .map(image -> ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(image))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}