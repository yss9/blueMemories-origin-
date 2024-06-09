package com.spring.container.spring.repository;

import com.spring.container.spring.domain.DiaryApplicationList;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DiaryApplicationListRepository extends JpaRepository<DiaryApplicationList, Long> {

    @Query(value = "select d from DiaryApplicationList d where d.receiver =:receiver")
    List<DiaryApplicationList> findAllByReceivers(@Param("receiver") String receiver);

    @Query(value = "select d.id from DiaryApplicationList d where d.receiver =:receiver " +
            "and d.sender =:sender and d.title=:title")
    Long findByAcceptData(@Param("receiver") String receiver,
                          @Param("sender") String sender,
                          @Param("title") String title);

    @Override
    List<DiaryApplicationList> findAll();

    Optional<DiaryApplicationList> findById(Long Id);

    void deleteById(Long id);
    void deleteDiaryApplicationListById(Long Id);
}
