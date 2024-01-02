package com.ragtag.BlueMemories.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {

    @GetMapping("/")
    public String Home(){
        return "home";
    }

}
