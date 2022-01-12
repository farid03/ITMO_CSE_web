package ru.ifmo.se.web4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.ifmo.se.web4.user.User;
import ru.ifmo.se.web4.user.Users;

import java.text.SimpleDateFormat;
import java.util.Map;

@Controller
public class RegistrationController {

    @Autowired
    private Users users;

    @GetMapping(value = "/")
    public String read() {
        return "main.html";
    }


    @GetMapping("/registration")
    public String registration() {
        return "registration.html";
    }

    @PostMapping("registration")
    public String addUser(User user) {
        User userFromDB = users.findByUsername(user.getUsername());

        if (userFromDB != null) {
            System.out.println("User exists!");
            return "redirect:/registration?error=exists";
        }

        if (user.getUsername().trim().equals("") || user.getPassword().trim().equals("")) {
            return "redirect:/registration?error=null";
        }

        user.setPassword(user.getPassword().trim());
        user.setUsername(user.getUsername().trim());
        users.save(user);

        return "redirect:/login?sucsess";
    }

}
