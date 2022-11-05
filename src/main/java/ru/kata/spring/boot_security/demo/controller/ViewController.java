package ru.kata.spring.boot_security.demo.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/")
    public String MainPage() {
        return "redirect:/login";
    }

    /** После авторизации с ролью ADMIN, пользователя перекидывает на страницу allusers
     * запускаются все скрипты
     */
    @GetMapping("/admin")
    public String adminPage() {
        return "all_users";
    }

    /** После авторизации с ролью USER, пользователя перекидывает на страницу user_only_info
    оттуда запускается крипт UserPage.js и заполняются поля в навбаре и таблицу
     */
    @GetMapping("/user")
    public String userPage() {
        return "user_only_info";
    }
}
