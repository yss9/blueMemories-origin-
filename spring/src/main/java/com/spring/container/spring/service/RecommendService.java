package com.spring.container.spring.service;

import com.spring.container.spring.repository.DiaryListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class RecommendService {
    /*
    1. 리액트에서 요청
    2. 요청된 사람이 오늘 다이어리를 작성했는지 확인
     < -- 작성된 다이어리가 있으면 -- >
    2.1 다이어리에서 분석한 수치 3개를 가져옴
    2.2 각 수치가 이럴 때 유튜브에 검색할 만한 검색어를 챗지피티에게 추천받음
    2.3 추번받은 데이터를 유튜브에 검색해서 해당 데이터를 받아옴
    2.4 그 데이터를 리액트 서버로 넘김
     < -- 작성된 다이어리가 없으면 -- >
    2.1 다이어리를 작성해야 추천받을 수 있다고 뜸
     */
    @Autowired
    private DiaryListRepository diaryListRepository;

    private final WebClient webClient;

    @Value("${yt_api.key}")
    private String ytKey;

    @Value("${gpt_api.key}")
    private String gptKey;

    @Value("${gpt_api.model}")
    private String model;
    private String messages;

    public RecommendService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
    }

//    public Mono<String> getChatResponse(String prompt) {
//        return webClient.post()
//                .uri("/chat/completions")
//                .header("Authorization", gptKey)
//                .bodyValue(new ChatRequest("gpt-3.5-turbo", prompt))
//                .retrieve()
//                .bodyToMono(String.class);
//    }

}
