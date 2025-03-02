package com.spring.container.spring.service;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import com.spring.container.spring.dto.NovelDTO;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface NovelService {
    Novel createNovel(Novel novel);
    List<Novel> getNovelsByMemberId(Long memberId);
    List<NovelDTO> getAllNovelsById(Long id);
    List<NovelDTO> getIncompleteNovelsByMemberId(Long memberId);
    List<NovelDTO> getCompleteNovelsByMemberId(Long memberId);
    void deleteTemporaryNovelsByMemberId(Long memberId);
    Optional<NovelDTO> getNovelById(Long id);
    void updateNovel(Long novelId, String title, byte[] coverImage, int titleX, int titleY, int titleSize, NovelStatus status);
}