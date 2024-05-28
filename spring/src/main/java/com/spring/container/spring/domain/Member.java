package com.spring.container.spring.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length=20, unique = true)
    private String memberId;

    @Column(nullable = false, length=20)
    private String password;

    @Column(nullable = false, length=20)
    private String nickname;

    @Column(nullable = false)
    @ColumnDefault("0.0")
    private Double experienceRate = 0.0;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GeneralDiary> generalDiaries = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Novel> novels = new ArrayList<>();
}