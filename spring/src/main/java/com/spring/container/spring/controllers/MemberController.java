package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Member;
import com.spring.container.spring.dto.UpdateMemberDto;
import com.spring.container.spring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    private void createMember(@RequestBody Member member) {
        memberService.createMember(member);
    }

    @GetMapping("/member/{id}")
    private Optional<Member> findMember(@PathVariable Long id){
        return memberService.findMember(id);
    }

    @PutMapping("/member/{id}/password")
    private Member updateMember(@PathVariable Long id,@RequestBody UpdateMemberDto request){
        return memberService.updateMember(id, request.getPassword());
    }

    @DeleteMapping("/member/{id}")
    private void deleteMember(@PathVariable Long id){
        memberService.deleteMember(id);
    }


}