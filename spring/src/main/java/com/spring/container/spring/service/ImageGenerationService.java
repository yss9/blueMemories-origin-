package com.spring.container.spring.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ImageGenerationService {

    private final WebClient webClient;

    @Value("${api.stable-diffusion.key}")
    private String apiKey;

    public ImageGenerationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.stability.ai").build();
    }

    public Mono<ByteArrayResource> generateImage(String prompt, String style) {
        MultiValueMap<String, HttpEntity<?>> parts = new LinkedMultiValueMap<>();
        parts.add("prompt", new HttpEntity<>(prompt));
        parts.add("aspect_ratio", new HttpEntity<>("9:16"));
        parts.add("style_preset", new HttpEntity<>(style));
        parts.add("output_format", new HttpEntity<>("jpeg"));

        return webClient.post()
                .uri("/v2beta/stable-image/generate/core")
                .header(HttpHeaders.AUTHORIZATION, "Bearer "+apiKey)
                .header(HttpHeaders.ACCEPT, "image/*") // 이미지를 직접 받도록 설정
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .bodyValue(parts)
                .retrieve()
                .bodyToMono(byte[].class)
                .map(ByteArrayResource::new);
    }
}