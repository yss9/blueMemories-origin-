package com.spring.container.spring.service;

import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.repository.GeneralDiaryContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
    private GeneralDiaryContentRepository generalDiaryContentRepository;

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private DiaryServiceImpl diaryService;



    public List<String> RecommendSearch(String year, String month, String day){
        GeneralDiaryContent generalDiaryContent = diaryService.generalDiaryContent(year, month, day);
        String confidenceNegative = Double.toString(generalDiaryContent.getConfidenceNegative());
        String confidenceNeutral = Double.toString(generalDiaryContent.getConfidenceNeutral());
        String confidencePositive = Double.toString(generalDiaryContent.getConfidencePositive());

        String prompt = "감정 수치가 부정 : " + confidenceNegative + "%, 중립 : " + confidenceNeutral +", 긍정 : " + confidencePositive +
                "일 때 들을만한 노래 두곡과 유튜브에서 볼만한 동영상 검색어 2가지를 추천해줘"+
                "답변은 1. 노래 : 노래제목 - 가수 , 2. 노래 : 노래제목 - 가수 , 3. 검색어 : 검색어결과, 4. 검색어 : 검색어결과 의 형태로 제공해줘" ;

        Mono<String> chatResponse = openAIService.getChatResponse(prompt);
        String response = chatResponse.block();
        System.out.println("response = " + response);


        List<String> songs = new ArrayList<>();
        List<String> searches = new ArrayList<>();
        List<String> results = new ArrayList<>();
        // 정규 표현식을 사용하여 노래와 검색어를 추출
        Pattern songPattern = Pattern.compile("노래 : ([^\\-]+) - ([^\n]+)");
        Pattern searchPattern = Pattern.compile("검색어 : ([^\n]+)");

        // 노래를 추출
        Matcher songMatcher = songPattern.matcher(response);
        while (songMatcher.find()) {
            songs.add(songMatcher.group(1).trim() + " - " + songMatcher.group(2).trim());
        }

        // 검색어를 추출
        Matcher searchMatcher = searchPattern.matcher(response);
        while (searchMatcher.find()) {
            searches.add(searchMatcher.group(1).trim());
        }

        // 결과 출력
        System.out.println("노래 리스트:");
        for (String song : songs) {
            results.add(song);
            System.out.println(song);

        }

        System.out.println("\n검색어 리스트:");
        for (String search : searches) {
            results.add(search);
            System.out.println(search);
        }

        return results;
    }



}
