package com.spring.container.spring.controllers;

import com.spring.container.spring.service.OpenAIService;
import com.spring.container.spring.service.RecommendService;
import com.spring.container.spring.service.YouTubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RecommendController {

    @Autowired
    private RecommendService recommendService;

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private YouTubeService youTubeService;

    @GetMapping("/search")
    public Mono<List<String>> searchVideos() {
        LocalDate currentDate = LocalDate.now();
        String year = String.valueOf(currentDate.getYear());
        String month = String.valueOf(currentDate.getMonthValue());
        String day = String.valueOf(currentDate.getDayOfMonth());
        List<String> queries = recommendService.RecommendSearch(year, month, day);
        return youTubeService.searchVideos(queries);
    }

}
