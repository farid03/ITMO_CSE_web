package ru.ifmo.se.web4.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.ifmo.se.web4.model.Point;
import ru.ifmo.se.web4.model.Points;
import ru.ifmo.se.web4.user.User;

import java.util.ArrayList;

@RestController
@RequestMapping("point")
public class PointsController {
    private final Points points;

    public PointsController(Points points) {
        this.points = points;
    }

    @GetMapping
    public ResponseEntity<?> points() {
        return new ResponseEntity<>(points.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> checkArea(@AuthenticationPrincipal User user, @RequestBody Point point) {
        point.setHit();
        point.setCreator_user(user.getUsername());
        points.save(point);
        System.out.println(point.toJSON());
        return new ResponseEntity<>(point, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> clear() {
        points.deleteAll();
        return new ResponseEntity<>("Коллекция успешно очищена!", HttpStatus.OK);
    }
}
