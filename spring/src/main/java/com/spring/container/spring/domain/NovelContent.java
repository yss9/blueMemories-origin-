package com.spring.container.spring.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class NovelContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "novel_id", nullable = false)
    @JsonBackReference
    private Novel novel;

    @Column(nullable = false)
    private int pageNumber;

    @Lob
    private String textContent;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;
}