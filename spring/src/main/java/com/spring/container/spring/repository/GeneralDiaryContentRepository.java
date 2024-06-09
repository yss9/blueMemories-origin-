package com.spring.container.spring.repository;

import com.spring.container.spring.domain.GeneralDiaryContent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GeneralDiaryContentRepository extends JpaRepository<GeneralDiaryContent, Long> {

    Optional<GeneralDiaryContent> findByYearAndMonthAndDay(String year, String month, String day);
}