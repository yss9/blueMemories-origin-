package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Member;
import com.spring.container.spring.service.MemberService;
import com.spring.container.spring.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MemberController {

    @Autowired
    private MemberServiceImpl memberService;

    @PostMapping
    public Member createMember(@RequestBody Member member) {
        return memberService.createMember(member);
    }

    @GetMapping("/{id}")
    public Optional<Member> getMemberById(@PathVariable Long id) {
        return memberService.findMemberById(id);

    }

    @PostMapping("/by-memberId")
    public Member getMemberByMemberId(@PathVariable String memberId) {
        Optional<Member> member = memberService.findMemberByMemberId(memberId);
        Member member1 = member.get();
        return member1;
    }

    @GetMapping("/nickname/{memberId}")
    public String getNicknameByMemberId(@PathVariable String memberId) {
        return memberService.findNicknameByMemberId(memberId);
    }

    @GetMapping
    public List<Member> getAllMembers() {
        return memberService.findAllMembers();
    }

    @PutMapping("/{id}")
    public Member updateMember(@PathVariable Long id, @RequestBody String password) {
        return memberService.updateMember(id, password);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}