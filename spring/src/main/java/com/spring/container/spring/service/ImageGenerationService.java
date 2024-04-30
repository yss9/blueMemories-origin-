package com.spring.container.spring.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class ImageGenerationService {

    private final WebClient webClient;

    @Value("${api.stable-diffusion.key}")
    private String apiKey;

    public ImageGenerationService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<ByteArrayResource> generateImage(String prompt) {
        return webClient.post()
                .uri("https://api.stability.ai/v2beta/stable-image/generate/sd3")
                .header("Authorization", "Bearer " + apiKey)
                .header("Accept", "image/*")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromFormData("prompt", prompt)
                        .with("output_format", "jpeg"))
                .retrieve()
                .onStatus(HttpStatusCode::isError, response -> Mono.error(new RuntimeException("API call failed")))
                .bodyToMono(byte[].class)
                .map(ByteArrayResource::new);
    }
}