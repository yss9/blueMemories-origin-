package com.spring.container.spring.service;

import com.spring.container.spring.domain.ExchangeDiaryContent;
import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.domain.Member;
import com.spring.container.spring.dto.SentimentResult;
import com.spring.container.spring.repository.ExchangeDiaryContentRepository;
import com.spring.container.spring.repository.GeneralDiaryContentRepository;
import com.spring.container.spring.repository.MemberRepository;
import com.spring.container.spring.repository.RecommendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;


@Service
public class SentimentAnalysisService implements DiaryService {

    private final WebClient webClient;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GeneralDiaryContentRepository generalDiaryContentRepository;

    @Autowired
    private ExchangeDiaryContentRepository exchangeDiaryContentRepository;

    @Value("${sentiment_api.key}")
    private String apiKey;

    @Value("${sentiment_api.key_id}")
    private String apiKeyID;

    public SentimentAnalysisService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://naveropenapi.apigw.ntruss.com").build();
    }

    public Mono<SentimentResult> analyzeSentiment(String content) {
        return webClient.post()
                .uri("/sentiment-analysis/v1/analyze")
                .header("Content-Type", "application/json")
                .header("X-NCP-APIGW-API-KEY-ID", apiKeyID)
                .header("X-NCP-APIGW-API-KEY", apiKey)
                .bodyValue(Map.of("content", content))
                .retrieve()
                .bodyToMono(SentimentResult.class);
    }



    public GeneralDiaryContent createDiaryContent(GeneralDiaryContent generalDiaryContent) {
        // 내용 추출
        String content = generalDiaryContent.getContent();
        SentimentResult sentimentResult;
        sentimentResult = analyzeSentiment(content).block();
        // 감정 분석 결과 받기
        String sentiment = sentimentResult.getDocument().getSentiment();
        Double confidenceNegative = sentimentResult.getDocument().getConfidence().getNegative();
        Double confidencePositive = sentimentResult.getDocument().getConfidence().getPositive();
        Double confidenceNeutral = sentimentResult.getDocument().getConfidence().getNeutral();

        // GeneralDiaryContent 객체에서 Member ID 추출
        Long memberId = generalDiaryContent.getMember().getId();
        Optional<Member> result = memberRepository.findById(memberId);
        if (!result.isPresent()) {
            throw new RuntimeException("Member not found with id: " + memberId);
        }
        Member member = result.get();

        // 일기 내용 설정
        generalDiaryContent.setMember(member); // 이미 설정된 멤버 객체를 재확인하거나 업데이트
        generalDiaryContent.setSentiment(sentiment);
        generalDiaryContent.setConfidenceNegative(confidenceNegative);
        generalDiaryContent.setConfidenceNeutral(confidenceNeutral);
        generalDiaryContent.setConfidencePositive(confidencePositive);

        // 저장 후 결과 반환
        return generalDiaryContentRepository.save(generalDiaryContent);
    }

    public ExchangeDiaryContent createExchangeDiary(ExchangeDiaryContent exchangeDiaryContent) {
        // 내용 추출
        String content = exchangeDiaryContent.getContent();
        SentimentResult sentimentResult;
        sentimentResult = analyzeSentiment(content).block();
        // 감정 분석 결과 받기
        String sentiment = sentimentResult.getDocument().getSentiment();
        Double confidenceNegative = sentimentResult.getDocument().getConfidence().getNegative();
        Double confidencePositive = sentimentResult.getDocument().getConfidence().getPositive();
        Double confidenceNeutral = sentimentResult.getDocument().getConfidence().getNeutral();

        // GeneralDiaryContent 객체에서 Member ID 추출

        // 일기 내용 설정
        exchangeDiaryContent.setSentiment(sentiment);
        exchangeDiaryContent.setConfidenceNegative(confidenceNegative);
        exchangeDiaryContent.setConfidenceNeutral(confidenceNeutral);
        exchangeDiaryContent.setConfidencePositive(confidencePositive);


        // 저장 후 결과 반환
        return exchangeDiaryContentRepository.save(exchangeDiaryContent);
    }


}
