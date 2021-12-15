package beans;

import lombok.Data;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@ManagedBean(name = "clock", eager = true)
@ApplicationScoped
@Data
public class ClockBean implements Serializable {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm:ss dd.MM.yyyy ");
    LocalDateTime localDate;

    public LocalDateTime getLocalDate() {
        return LocalDateTime.now();
    }
}
