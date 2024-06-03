package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;

import java.util.List;
import java.util.Optional;

public interface NovelService {
    Novel createNovel(Novel novel);
    List<Novel> getNovelsByMemberId(Long memberId);
//    Optional<Novel> getNovelById(Long id);
    List<NovelDTO> getAllNovelsById(Long id);

}