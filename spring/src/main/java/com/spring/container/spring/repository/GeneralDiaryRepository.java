package com.spring.container.spring.repository;

import com.spring.container.spring.domain.GeneralDiary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GeneralDiaryRepository extends JpaRepository<GeneralDiary, Long> {
}
