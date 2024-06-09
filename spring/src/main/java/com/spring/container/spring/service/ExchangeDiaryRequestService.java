package com.spring.container.spring.service;


import com.spring.container.spring.domain.DiaryApplicationList;
import com.spring.container.spring.domain.ExchangeDiary;
import com.spring.container.spring.repository.DiaryApplicationListRepository;
import com.spring.container.spring.repository.ExchangeDiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeDiaryRequestService {

    @Autowired
    private DiaryApplicationListRepository diaryApplicationListRepository;

    @Autowired
    private ExchangeDiaryRepository exchangeDiaryRepository;


    public DiaryApplicationList RequestExDiary(DiaryApplicationList application){
        DiaryApplicationList diaryApplication = new DiaryApplicationList();
        diaryApplication.setSender(application.getSender());
        diaryApplication.setReceiver(application.getReceiver());
        diaryApplication.setTitle(application.getTitle());
        diaryApplicationListRepository.save(diaryApplication);
        return diaryApplication;
    }

    public List<DiaryApplicationList> AllRequestList(){
        return diaryApplicationListRepository.findAll();
    }

    public List<DiaryApplicationList> RequestApplicationList(String receiver){
         return diaryApplicationListRepository.findAllByReceivers(receiver);
    }

    public DiaryApplicationList DeleteApplication(Long id){
        Optional<DiaryApplicationList> app = diaryApplicationListRepository.findById(id);
        DiaryApplicationList diaryApplication = app.get();
        diaryApplicationListRepository.deleteById(id);
        return diaryApplication;
    }

    public ExchangeDiary InsertExchangeDiary(DiaryApplicationList diaryApplicationList){
        String receiver = diaryApplicationList.getReceiver();
        String sender = diaryApplicationList.getSender();
        String title = diaryApplicationList.getTitle();
        ExchangeDiary exchangeDiary = new ExchangeDiary();
        exchangeDiary.setMemberNo1(receiver);
        exchangeDiary.setMemberNo2(sender);
        exchangeDiary.setTitle(title);
        return exchangeDiaryRepository.save(exchangeDiary);
    }


}
