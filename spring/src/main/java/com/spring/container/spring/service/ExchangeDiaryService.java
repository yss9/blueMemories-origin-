package com.spring.container.spring.service;

import com.spring.container.spring.domain.ExchangeDiary;
import com.spring.container.spring.domain.ExchangeDiaryContent;
import com.spring.container.spring.repository.ExchangeDiaryContentRepository;
import com.spring.container.spring.repository.ExchangeDiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeDiaryService {

    @Autowired
    private ExchangeDiaryRepository exchangeDiaryRepository;

    @Autowired
    private ExchangeDiaryContentRepository exchangeDiaryContentRepository;

    public ExchangeDiary findExchangeDiaryById(Long id){
        Optional<ExchangeDiary> exchangeDiary =  exchangeDiaryRepository.findById(id);
        return exchangeDiary.get();
    }

    public List<ExchangeDiary> getExchangeDiaryList(String member){
        return exchangeDiaryRepository.findExchangeDiariesByMemberNo1OrMemberNo2(member, member);
    }

    public List<ExchangeDiaryContent> getExchangeDiaryContentList(Long id){
        return exchangeDiaryContentRepository.findExchangeDiaryContentsByExchangeDiaryId(id);
    }


}
