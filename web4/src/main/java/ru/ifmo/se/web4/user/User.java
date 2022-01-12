package ru.ifmo.se.web4.user;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
@Table(name = "users_table")
public class User implements UserDetails {
    // TODO при логине можно задать пустые поля, что приведет к ошибке UserDetailsService returned null, which is an interface contract violation
    // если написать несуществующие данные то тоже будет ошибка An internal error occurred while trying to authenticate the user.
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String username;

    private String password;

//    private boolean active;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

//    private String lastVisit;

}
