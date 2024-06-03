package com.spring.container.spring.repository;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NovelRepository extends JpaRepository<Novel, Long> {
    List<Novel> findByMemberId(Long memberId);
//    Optional<Novel> findById(Long id);
    List<Novel> findAllById(Long id);
}
