package com.spring.container.spring.repository;

import com.spring.container.spring.domain.NovelContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NovelContentRepository extends JpaRepository<NovelContent, Long> {
}