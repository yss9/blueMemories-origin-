package com.spring.container.spring.repository;

import com.spring.container.spring.domain.GeneralDiaryContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<GeneralDiaryContent, Long> {
}
