package com.spring.container.spring.repository;
import com.spring.container.spring.domain.NovelContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NovelContentRepository extends JpaRepository<NovelContent, Long> {
    List<NovelContent> findByNovelId(Long novelId); // 새로운 메서드 추가

    @Transactional
    void deleteByNovelId(Long novelId);
}