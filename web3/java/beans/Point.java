package beans;

import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "point")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Column(name = "x", nullable = false)
    private String x;
    @Column(name = "y", nullable = false)
    private String y;
    @Column(name = "r", nullable = false)
    private String r;
    @Column(name = "currentTime", nullable = false)
    private String currentTime;
    @Column(name = "hit", nullable = false)
    private String hit;

    public Point() {
        this.r = "2.0";
    }


    public String toJSON() {
        return "{" +
                "\"x\":" + "\"" + this.x + "\"" + "," +
                "\"y\":" + "\"" + this.y + "\"" + "," +
                "\"r\":" + "\"" + this.r + "\"" + "," +
                "\"currentTime\":" + "\"" + this.currentTime + "\"" + "," +
                "\"hit\":" + "\"" + this.hit + "\"" +
                "}";
    }

    public String toMessage() {
        return "Проверка точки (" + this.x + "; " + this.y + ")\n" +
                "Параметр: " + this.r + "\n" +
                "Время отправки: " + this.currentTime + "\n" +
                "Результат: " + this.hit;
    }
}
