package com.spring.container.spring.service;

import com.spring.container.spring.domain.GeneralDiary;
import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.domain.Member;
import com.spring.container.spring.dto.SentimentResult;
import com.spring.container.spring.repository.DiaryListRepository;
import com.spring.container.spring.repository.DiaryRepository;
import com.spring.container.spring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;


@Service
public class SentimentAnalysisService implements DiaryService {

    private final WebClient webClient;
    private SentimentResult sentimentResult = new SentimentResult();

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiaryListRepository diaryListRepository;

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



    public GeneralDiaryContent createDiaryContent(Long id, GeneralDiaryContent generalDiaryContent) {
        String content = generalDiaryContent.getContent();
        sentimentResult = analyzeSentiment(content).block();
        String sentiment = sentimentResult.getDocument().getSentiment();
        Double confidenceNegative = sentimentResult.getDocument().getConfidence().getNegative();
        Double confidencePositive =  sentimentResult.getDocument().getConfidence().getPositive();
        Double confidenceNeutral =  sentimentResult.getDocument().getConfidence().getNeutral();

        Optional<Member> result = memberRepository.findById(id);
        Member member = result.get();

        generalDiaryContent.setMember(member);
        generalDiaryContent.setSentiment(sentiment);
        generalDiaryContent.setConfidenceNegative(confidenceNegative);
        generalDiaryContent.setConfidenceNeutral(confidenceNeutral);
        generalDiaryContent.setConfidencePositive(confidencePositive);

        return diaryListRepository.save(generalDiaryContent);
    }



}
