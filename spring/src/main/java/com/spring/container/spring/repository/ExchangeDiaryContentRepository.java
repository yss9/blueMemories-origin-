package com.spring.container.spring.repository;

import com.spring.container.spring.domain.ExchangeDiaryContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExchangeDiaryContentRepository extends JpaRepository<ExchangeDiaryContent, Long> {

    List<ExchangeDiaryContent> findExchangeDiaryContentsByExchangeDiaryId(Long exchangeDiary_id);
}
