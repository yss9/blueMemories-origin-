package com.spring.container.spring.service;

import com.spring.container.spring.domain.GeneralDiary;
import com.spring.container.spring.repository.DiaryListRepository;
import com.spring.container.spring.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiaryServiceImpl {

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private DiaryListRepository diaryListRepository;



}
