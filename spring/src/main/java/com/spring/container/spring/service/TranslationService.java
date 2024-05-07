package com.spring.container.spring.service;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TranslationService {
    private final WebClient webClient;

    @Value("${api.translate.key}")
    private String apiKey;

    public TranslationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://translation.googleapis.com").build();
    }

    public Mono<String> translateText(String prompt) {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("q", prompt);
        requestBody.put("source", "ko");
        requestBody.put("target", "en");
        requestBody.put("format", "text");

        return webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/language/translate/v2")
                        .queryParam("key", apiKey)
                        .build())
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var translations = (List<Map<String, String>>) ((Map<String, Object>) response.get("data")).get("translations");
                    return translations.get(0).get("translatedText");
                });
    }
}