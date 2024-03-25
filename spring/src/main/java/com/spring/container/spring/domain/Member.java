package com.spring.container.spring.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="member")
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=20, unique = true)
    private String email;

    @Column(nullable = false, length=20)
    private String password;

    @Column(nullable = false, length=20)
    private String name;


}