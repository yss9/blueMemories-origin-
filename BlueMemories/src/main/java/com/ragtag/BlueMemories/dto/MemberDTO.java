package com.ragtag.BlueMemories.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MemberDTO {
    private Long id;
    private String password;
    private String email;
    private String name;
    private int age;
    private String gender;



}
