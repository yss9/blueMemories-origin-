package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.dto.SentimentResult;
import com.spring.container.spring.repository.DiaryRepository;
import com.spring.container.spring.service.SentimentAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;
    @PostMapping("/analysis")
    public SentimentResult processSentiment(@RequestBody String content) {
        // Mono<SentimentResult>를 블로킹 호출로 처리하여 SentimentResult를 동기적으로 반환
        return sentimentAnalysisService.analyzeSentiment(content).block();
    }

    @PostMapping("/{id}/posting")
    public void saveDiaryContent(@PathVariable Long id, @RequestBody GeneralDiaryContent generalDiaryContent){

    }

    @GetMapping("/{id}/diarys")
    public void getDiarys(@PathVariable Long id){
        // list.diary(long id);
    }
}


