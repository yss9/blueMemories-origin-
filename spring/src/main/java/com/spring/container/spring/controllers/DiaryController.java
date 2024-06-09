package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.domain.Member;
import com.spring.container.spring.service.DiaryServiceImpl;
import com.spring.container.spring.service.FileStorageService;
import com.spring.container.spring.service.MemberServiceImpl;
import com.spring.container.spring.service.SentimentAnalysisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Slf4j
public class DiaryController {

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;

    @Autowired
    private FileStorageService fileStorageService; // 파일 저장 서비스

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private DiaryServiceImpl diaryService;

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
        Optional<Member> member = memberService.findMemberById(1L);
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

    @GetMapping("/entries/{year}/{month}/{day}")
    public GeneralDiaryContent getEntryByDate(@PathVariable("year") String year, @PathVariable("month") String month, @PathVariable("day") String day) {;
        return diaryService.generalDiaryContent(year,month,day);
    }

    private final Path rootLocation = Paths.get("C:\\Users\\Admin\\Desktop\\spring\\blueMemories\\uploads");

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Could not read the file: " + e.getMessage());
        }
    }

}
