package com.spring.container.spring.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Base64;

public class NovelDTO {
    @Setter
    @Getter
    private Long id;
    @Setter
    @Getter
    private String title;
    @Setter
    @Getter
    private int titleX;
    @Setter
    @Getter
    private int titleY;
    @Setter
    @Getter
    private String status;
    @Setter
    @Getter
    private Long memberId;
    @Getter
    private String coverImage;

    public void setCoverImage(byte[] coverImage) {
        if (coverImage != null) {
            this.coverImage = Base64.getEncoder().encodeToString(coverImage);
        } else {
            this.coverImage = null;
        }
    }

}
