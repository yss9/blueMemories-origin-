package com.spring.container.spring.service;

import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.repository.GeneralDiaryContentRepository;
import com.spring.container.spring.repository.GeneralDiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiaryServiceImpl {

    @Autowired
    private GeneralDiaryRepository generalDiaryRepository;

    @Autowired
    private GeneralDiaryContentRepository generalDiaryContentRepository;


    public GeneralDiaryContent generalDiaryContent(String year, String month, String day){
        Optional<GeneralDiaryContent> generalDiaryContent = generalDiaryContentRepository.findByYearAndMonthAndDay(year,month,day);
        GeneralDiaryContent content = generalDiaryContent.get();
        return content;
    }


}
