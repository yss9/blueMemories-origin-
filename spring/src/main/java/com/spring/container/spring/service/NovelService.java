package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;

import java.util.List;

public interface NovelService {
    Novel createNovel(Novel novel);
    List<Novel> getNovelsByMemberId(Long memberId);
    List<Novel> getNovelsByMemberIdAndStatus(Long memberId, NovelStatus status);
    Novel updateNovelStatus(Long novelId, NovelStatus status);

}