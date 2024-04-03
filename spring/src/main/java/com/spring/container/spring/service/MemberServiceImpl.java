package com.spring.container.spring.service;

import com.spring.container.spring.domain.Member;
import com.spring.container.spring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;


    @Override
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Optional<Member> findMember(Long id) {
        return memberRepository.findById(id);
    }

    @Override
    public List<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    public Member updateMember(Long id, String pw) {
        Member member = memberRepository.findById(id).
                orElseThrow(() -> new RuntimeException("Member not found for this id :: " + id));
        member.setPassword(pw);
        return memberRepository.save(member);
    }

    @Override
    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found for this id :: " + id));
        memberRepository.delete(member);
    }
}
