package com.spring.container.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore //직렬화 무시(base64 문자열로 변환하여 반환할 수 있도록 함)
    private byte[] coverImage;

    @Column(nullable = false, length = 100)
    private String title="untitled";

    @Column(nullable = false)
    private int titleX=0;

    @Column(nullable = false)
    private int titleY=0;

    @Column(nullable = false)
    private  int titleSize=0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BookStatus status=BookStatus.TEMPORARY;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @JsonBackReference
    private Member member;

    // NovelContent와 1:N 관계 설정
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<BookContent> contents = new ArrayList<>();

}

