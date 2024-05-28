package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.repository.NovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NovelServiceImpl implements NovelService {

    @Autowired
    private NovelRepository novelRepository;

    @Override
    public Novel createNovel(Novel novel) {
        return novelRepository.save(novel);
    }

    @Override
    public List<Novel> getNovelsByMemberId(Long memberId) {
        return novelRepository.findByMemberId(memberId);
    }

    @Override
    public List<Novel> getNovelsByMemberIdAndStatus(Long memberId, NovelStatus status) {
        return novelRepository.findByMemberIdAndStatus(memberId, status);
    }

    @Override
    public Novel updateNovelStatus(Long novelId, NovelStatus status) {
        Novel novel = novelRepository.findById(novelId)
                .orElseThrow(() -> new RuntimeException("Novel not found"));
        novel.setStatus(status);
        return novelRepository.save(novel);
    }
}