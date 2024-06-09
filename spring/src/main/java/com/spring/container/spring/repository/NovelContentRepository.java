package com.spring.container.spring.repository;
import com.spring.container.spring.domain.NovelContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NovelContentRepository extends JpaRepository<NovelContent, Long> {
    @Query("SELECT nc FROM NovelContent nc WHERE nc.novel.id= :novelId ORDER BY nc.pageNumber ASC")
    List<NovelContent> findByNovelIdOrderByPageNumber(Long novelId);
    @Transactional
    void deleteByNovelId(Long novelId);
}