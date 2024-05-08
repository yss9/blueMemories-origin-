package com.spring.container.spring.repository;

import com.spring.container.spring.domain.RecommendHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendRepository extends JpaRepository<RecommendHistory, Long> {
}
