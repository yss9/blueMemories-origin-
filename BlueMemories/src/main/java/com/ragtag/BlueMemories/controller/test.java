package com.ragtag.BlueMemories.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class test {
    @GetMapping("/getTest")
    public String getTest() {
        return "change test !@!@!@";
    }

    @PostMapping("/postTest")
    public String postTest() {
        return "Hello World!  change test success!!!!";
    }

    @GetMapping("/gettt")
    public String gettt() {
        return "change test !@!@!@";
    }
}
