package com.spring.container.spring.controllers;

import com.spring.container.spring.service.ImageGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api", method = RequestMethod.POST)
public class ImageController {

    private final ImageGenerationService imageService;

    @Autowired
    public ImageController(ImageGenerationService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/generate-image")
    public Mono<ResponseEntity<ByteArrayResource>> generateImage(@RequestPart("prompt") String prompt, @RequestPart("style_preset") String style,@RequestPart("aspect_ratio") String aspect_ratio) {
        return imageService.generateImage(prompt, style, aspect_ratio)
                .map(image -> ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(image))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}