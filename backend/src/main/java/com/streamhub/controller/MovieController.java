package com.streamhub.controller;
import com.streamhub.model.Movie;
import com.streamhub.repository.MovieRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/movies")
public class MovieController {
 private final MovieRepository repo;
 public MovieController(MovieRepository repo){this.repo=repo;}
 @GetMapping public List<Movie> all(@RequestParam(required=false) String search,@RequestParam(required=false) String category){if(search!=null&&!search.isBlank())return repo.findByTitleContainingIgnoreCase(search);if(category!=null&&!category.isBlank())return repo.findByCategoryIgnoreCase(category);return repo.findAll();}
 @GetMapping("/{id}") public ResponseEntity<Movie> one(@PathVariable Long id){return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());}
 @PostMapping public Movie create(@RequestBody Movie movie){movie.setId(null);return repo.save(movie);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id){if(!repo.existsById(id))return ResponseEntity.notFound().build();repo.deleteById(id);return ResponseEntity.noContent().build();}
}
