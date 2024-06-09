package com.spring.container.spring.service;

import com.spring.container.spring.dto.YouTubeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class YouTubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final WebClient webClient;

    // 올바른 생성자 선언
    public YouTubeService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://www.googleapis.com/youtube/v3").build();
    }

    public Mono<List<String>> searchVideos(List<String> queries) {
        List<Mono<String>> videoResults = queries.stream()
                .map(this::searchSingleQuery)
                .collect(Collectors.toList());

        return Flux.merge(videoResults).collectList();
    }

    private Mono<String> searchSingleQuery(String query) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("part", "snippet")
                        .queryParam("q", query)
                        .queryParam("key", apiKey)
                        .queryParam("type", "video")
                        .queryParam("maxResults", 1) // 검색 결과에서 하나의 동영상만 가져오기
                        .build())
                .retrieve()
                .bodyToMono(YouTubeResponse.class)
                .flatMap(response -> {
                    if (response.getItems() != null && !response.getItems().isEmpty()) {
                        return Mono.just(response.getItems().get(0).getId().getVideoId());
                    } else {
                        return Mono.empty();
                    }
                });
    }
}
