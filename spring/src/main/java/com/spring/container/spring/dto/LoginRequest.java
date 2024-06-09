package com.spring.container.spring.dto;

public class LoginRequest { //로그인 요청 DTO
    private String memberId;
    private String password;

    // 기본 생성자
    public LoginRequest() {}

    // (아이디, 비번) 생성자
    public LoginRequest(String memberId, String password) {
        this.memberId = memberId;
        this.password = password;
    }

    // getter and setter
    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
