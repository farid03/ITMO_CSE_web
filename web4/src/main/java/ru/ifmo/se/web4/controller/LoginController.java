package ru.ifmo.se.web4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.ifmo.se.web4.user.User;
import ru.ifmo.se.web4.user.UserService;
import ru.ifmo.se.web4.user.Users;

@RestController
public class LoginController {
    @Autowired
    private Users users;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            System.out.println(user);
            if (user.getUsername() == null || user.getUsername().equals("")) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
            if (user.getPassword() == null || user.getPassword().equals("")) {
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }

            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User userFromDB = users.findByUsername(user.getUsername());
            if (userFromDB == null) {
                System.out.println("Пользователь не существует");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (AuthenticationException ex) {
            System.out.println(ex.toString());
            System.out.println("Попытка авторизации несуществующего пользователя");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
