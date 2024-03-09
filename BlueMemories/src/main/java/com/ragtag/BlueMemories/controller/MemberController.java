package com.ragtag.BlueMemories.controller;

import com.ragtag.BlueMemories.domain.Member;
import com.ragtag.BlueMemories.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public String registerMember(@RequestBody Member member) {
        memberService.registerMember(member);
        return "hello";

    }

}
