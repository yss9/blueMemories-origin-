package com.spring.container.spring.controllers;

import com.spring.container.spring.domain.Member;
import com.spring.container.spring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    private void registerMember(@RequestBody Member member) {
        memberService.registerMember(member);
    }

     @GetMapping("/getTest")
    public String getTest() {
        return "change test lol!!!!!!!!!!!!!!!!";
    }

    @PostMapping("/postTest")
    public String postTest() {
        return "Hello World!  change test success!!!!";
    }

    @GetMapping("/gettt")
    public String gettt() {
        return "change test success";
    }
}