
package com.streamhub.model;

import jakarta.persistence.*;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title, category, description, poster, videoUrl;

    @Column(name = "release_year")
    private Integer year;

    private String rating;
    private boolean featured;

    public Movie() {}

    public Movie(String title, String category, Integer year, String rating,
                 String description, String poster, String videoUrl, boolean featured) {
        this.title = title;
        this.category = category;
        this.year = year;
        this.rating = rating;
        this.description = description;
        this.poster = poster;
        this.videoUrl = videoUrl;
        this.featured = featured;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public Integer getYear() { return year; }
    public String getRating() { return rating; }
    public String getDescription() { return description; }
    public String getPoster() { return poster; }
    public String getVideoUrl() { return videoUrl; }
    public boolean isFeatured() { return featured; }

    public void setId(Long v) { id = v; }
    public void setTitle(String v) { title = v; }
    public void setCategory(String v) { category = v; }
    public void setYear(Integer v) { year = v; }
    public void setRating(String v) { rating = v; }
    public void setDescription(String v) { description = v; }
    public void setPoster(String v) { poster = v; }
    public void setVideoUrl(String v) { videoUrl = v; }
    public void setFeatured(boolean v) { featured = v; }
}
