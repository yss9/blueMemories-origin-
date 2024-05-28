package com.spring.container.spring.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Novel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String coverImage="";

    @Column(nullable = false, length = 100)
    private String title="untitled";

    @Column(nullable = false)
    private int titleX=0;

    @Column(nullable = false)
    private int titleY=0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private NovelStatus status=NovelStatus.IN_COMPLETED;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // NovelContent와 1:N 관계 설정
    @OneToMany(mappedBy = "novel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NovelContent> contents = new ArrayList<>();
}

