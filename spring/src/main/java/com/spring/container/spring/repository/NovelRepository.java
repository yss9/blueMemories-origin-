package com.spring.container.spring.repository;

import com.spring.container.spring.domain.Novel;
import com.spring.container.spring.domain.NovelStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface NovelRepository extends JpaRepository<Novel, Long> {
    List<Novel> findByMemberId(Long memberId);
    List<Novel> findByMemberIdAndStatus(Long memberId, NovelStatus status);
}
