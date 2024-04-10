package com.spring.container.spring.service;

import com.spring.container.spring.domain.GeneralDiary;
import com.spring.container.spring.domain.GeneralDiaryContent;
import com.spring.container.spring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface DiaryService {

    GeneralDiary createDiary(Member member, GeneralDiary generalDiary, GeneralDiaryContent generalDiaryContent);
    GeneralDiaryContent getDiaryContent(Long id, GeneralDiaryContent generalDiaryContent);

    void deleteDiaryContent(Long id);

}
