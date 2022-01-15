package ru.ifmo.se.web4.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping(value = "/")
    public String read() {
        return "index.html";
    }

    @GetMapping(value = "/login")
    public String login() {
        return "index.html";
    }

    @GetMapping(value = "/main")
    public String mainPage() {
        return "main.html";
    }

    @GetMapping("/registration")
    public String registration() {
        return "registration.html";
    }
}
