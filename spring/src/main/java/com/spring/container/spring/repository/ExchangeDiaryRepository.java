package com.spring.container.spring.repository;

import com.spring.container.spring.domain.ExchangeDiary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExchangeDiaryRepository extends JpaRepository<ExchangeDiary, Long> {

    Optional<ExchangeDiary> findById(Long id);
    List<ExchangeDiary> findExchangeDiariesByMemberNo1OrMemberNo2(String memberNo1, String memberNo2);

}
