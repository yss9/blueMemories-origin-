package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.domain.Member;
import com.spring.container.spring.service.FileStorageService;
import com.spring.container.spring.service.MemberServiceImpl;
import com.spring.container.spring.service.SentimentAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;

    @Autowired
    private FileStorageService fileStorageService; // 파일 저장 서비스

    @Autowired
    private MemberServiceImpl memberService;


    @PostMapping("/posting")
    public GeneralDiaryContent saveDiaryContent(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("year") String year,
            @RequestParam("month") String month,
            @RequestParam("day") String day,
            @RequestParam("weather") String weather
    ) {
        // 파일 저장
        String filePath = fileStorageService.storeFile(file);
        Optional<Member> member = memberService.findMember(1L);
        Member member1 = member.get();

        // GeneralDiaryContent 객체 생성
        GeneralDiaryContent generalDiaryContent = new GeneralDiaryContent();
        generalDiaryContent.setMember(member1);
        generalDiaryContent.setTitle(title);
        generalDiaryContent.setContent(content);
        generalDiaryContent.setYear(year);
        generalDiaryContent.setMonth(month);
        generalDiaryContent.setDay(day);
        generalDiaryContent.setWeather(weather);
        generalDiaryContent.setImage1(filePath); // 저장된 이미지 파일 경로 설정



        // 감정 분석 후 일기 내용 저장
        return sentimentAnalysisService.createDiaryContent(generalDiaryContent);
    }

    @GetMapping("/{id}/diarys")
    public void getDiarys(@PathVariable Long id){
        // 여기에서 id를 기반으로 일기 목록 조회 로직 구현
    }
}
