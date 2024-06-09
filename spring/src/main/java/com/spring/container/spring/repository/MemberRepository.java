package com.spring.container.spring.repository;

import com.spring.container.spring.domain.Member;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query(value = "select m.nickname from Member m where m.memberId = :memberId")
    String findNicknameByMemberId(@Param("memberId") String memberId);

    Optional<Member> findMemberByMemberId(String memberId);



}