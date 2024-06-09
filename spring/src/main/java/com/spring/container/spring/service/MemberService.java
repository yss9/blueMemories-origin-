package com.spring.container.spring.service;

import com.spring.container.spring.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Member createMember(Member member);
    Optional<Member> findMemberById(Long id);
    Optional<Member> findMemberByMemberId(String memberId);
    String findNicknameByMemberId(String memberId);
    List<Member> findAllMembers();
    Member updateMember(Long id, String pw);
    void deleteMember(Long id);
}