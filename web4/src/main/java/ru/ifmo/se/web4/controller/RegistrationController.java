package ru.ifmo.se.web4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.ifmo.se.web4.user.User;
import ru.ifmo.se.web4.user.Users;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RegistrationController {

    @Autowired
    private Users users;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registration")
    public String addUser(@RequestBody User user) {
        User userFromDB = users.findByUsername(user.getUsername());

        if (userFromDB != null) {
            System.out.println("User exists!");
            System.out.println(user);
            return "exists";
        }

        if (user.getUsername().trim().equals("") || user.getPassword().trim().equals("")) {
            return "null"; //на всякий случай...
        }

        user.setPassword(passwordEncoder.encode(user.getPassword().trim()));
        user.setUsername(user.getUsername().trim());
        users.save(user);

        return "sucsess";
    }

    @GetMapping("/users")
    public ResponseEntity<?> points() {
        List usernameList = new ArrayList();
        for (User user : users.findAll()) {
            usernameList.add(user.getUsername());
        }
        //TODO переделать на нормальный запрос к бд (без цикла)
        return new ResponseEntity<>(usernameList, HttpStatus.OK);
    }

}
