package com.spring.container.spring.service;

import com.spring.container.spring.domain.NovelContent;
import com.spring.container.spring.repository.NovelContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NovelContentServiceImpl implements NovelContentService {

    @Autowired
    private NovelContentRepository novelContentRepository;

    @Override
    public NovelContent createNovelContent(NovelContent novelContent) {
        return novelContentRepository.save(novelContent);
    }
}