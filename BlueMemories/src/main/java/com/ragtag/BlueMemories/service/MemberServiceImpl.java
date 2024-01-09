package com.ragtag.BlueMemories.service;

import com.ragtag.BlueMemories.domain.Member;
import com.ragtag.BlueMemories.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public void registerMember(Member member){
        memberRepository.save(member);
    }
}
