package com.spring.container.spring.service;

import com.spring.container.spring.dto.SentimentResult;
import com.spring.container.spring.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;


@Service
public class SentimentAnalysisService {

    @Autowired
    private DiaryRepository diaryRepository;

    private final WebClient webClient;

    public SentimentAnalysisService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://naveropenapi.apigw.ntruss.com").build();
    }

    public Mono<SentimentResult> analyzeSentiment(String content) {
        return webClient.post()
                .uri("/sentiment-analysis/v1/analyze")
                .header("X-NCP-APIGW-API-KEY-ID", "1jg34vs7ou")
                .header("X-NCP-APIGW-API-KEY", "zdtxTJPClHFRvzb87Kngv9pITYoC1QYeeqChAEwo")
                .bodyValue(Map.of("content", content))
                .retrieve()
                .bodyToMono(SentimentResult.class);
    }

}
