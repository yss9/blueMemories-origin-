package com.spring.container.spring.service;

import com.spring.container.spring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Member createMember(Member member);
    Optional<Member> findMember(Long id);
    List<Member> findAllMembers();
    Member updateMember(Long id, String pw);
    void deleteMember(Long id);
    //로그인 아이디 조회
    Optional<Member> findByMemberId(String memberId);
}