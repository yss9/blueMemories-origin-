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
public class GeneralDiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryNo;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "generalDiary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GeneralDiaryContent> generalDiaryContents = new ArrayList<>();

    @Column(nullable = false, length = 30)
    private String title;

}
