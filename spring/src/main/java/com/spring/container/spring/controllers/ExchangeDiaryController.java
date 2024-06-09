package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.ExchangeDiary;
import com.spring.container.spring.domain.ExchangeDiaryContent;
import com.spring.container.spring.service.ExchangeDiaryService;
import com.spring.container.spring.service.FileStorageService;
import com.spring.container.spring.service.SentimentAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExchangeDiaryController {

    @Autowired
    private ExchangeDiaryService exchangeDiaryService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;

    //진행중인 교환일기 목록 보여주기
    @GetMapping("/exchange-diary-list")
    public List<ExchangeDiary> exchangeDiaryList(){
        String memberId = "asd123";
        return exchangeDiaryService.getExchangeDiaryList(memberId);
    }

    //교환일기 보기
    @GetMapping("/exchangeDiary-list/{id}")
    public ResponseEntity<List<ExchangeDiaryContent>> exchangeDiaryContentList(@PathVariable Long id)
    {
        List<ExchangeDiaryContent> items = exchangeDiaryService.getExchangeDiaryContentList(id);

        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(items, HttpStatus.OK);
        }
    }

    //교환일기 작성하기
    @PostMapping("/exchange-diary-write")
    public ExchangeDiaryContent exchangeDiaryContentCreate(
            @RequestParam("id") Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("year") String year,
            @RequestParam("month") String month,
            @RequestParam("day") String day,
            @RequestParam("weather") String weather,
            @RequestParam("writer") String writer
    ){
        String filePath = fileStorageService.storeFile(file);

        ExchangeDiaryContent exchangeDiaryContent = new ExchangeDiaryContent();
        ExchangeDiary exchangeDiary = exchangeDiaryService.findExchangeDiaryById(id);
        exchangeDiaryContent.setExchangeDiary(exchangeDiary);
        exchangeDiaryContent.setTitle(title);
        exchangeDiaryContent.setContent(content);
        exchangeDiaryContent.setYear(year);
        exchangeDiaryContent.setMonth(month);
        exchangeDiaryContent.setDay(day);
        exchangeDiaryContent.setWeather(weather);
        exchangeDiaryContent.setDiaryNo(1L);
        exchangeDiaryContent.setImage1(filePath); // 저장된 이미지 파일 경로 설정
        exchangeDiaryContent.setWriter(writer);
        return sentimentAnalysisService.createExchangeDiary(exchangeDiaryContent);

    }

    //교환일기 삭제하기

    //교환일기 수정하기


}
