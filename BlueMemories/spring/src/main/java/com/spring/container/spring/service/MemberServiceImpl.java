package com.spring.container.spring.service;

import com.spring.container.spring.domain.Member;
import com.spring.container.spring.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public void registerMember(Member member){
        memberRepository.save(member);
    }
}