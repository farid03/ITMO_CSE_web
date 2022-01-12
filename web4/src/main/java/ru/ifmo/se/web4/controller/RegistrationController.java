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

    @GetMapping("/registration")
    public String registration() {
        return "registration.html";
    }

    @PostMapping("registration")
    public String addUser(User user, Map<String, Object> model) {
        User userFromDB = users.findByUsername(user.getUsername());

        if (userFromDB != null) {
            System.out.println("User exists!");
            model.put("message", "User exists!");
            //TODO сообщить пользователю о том, что ник уже занят
            return "redirect:/login.html";
        }

//        user.setActive(true);
//        user.setLastVisit(String.valueOf(new SimpleDateFormat("HH:mm:ss dd/MM/yyyy")));
        users.save(user);

        return "redirect:/login.html";
    }

}
