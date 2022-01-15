package ru.ifmo.se.web4.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface Users extends JpaRepository<User, Long> {
    User findByUsername(String username);
    
    @Query(value = "SELECT username FROM users_table;", nativeQuery = true)
    List getUsernames();
}
