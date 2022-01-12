package ru.ifmo.se.web4.model;

import lombok.Data;
import ru.ifmo.se.web4.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Data
@Entity
@Table(name = "points_collection")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String creator_user = "me";

//    @ManyToOne(fetch = FetchType.EAGER)
//    @CollectionTable(name = "users_table", joinColumns = @JoinColumn(name = "username"))
//    private User user;

//    @Column(name = "x", nullable = false)
    private double x;
//    @Column(name = "y", nullable = false)
    private double y;
//    @Column(name = "r", nullable = false)
    private double r;
//    @Column(name = "currentTime", nullable = false)
    private String time = String.valueOf(new SimpleDateFormat("HH:mm:ss dd/MM/yyyy")
        .format(Calendar.getInstance().getTime()));
//    @Column(name = "hit", nullable = false)
    private boolean hit;

//    public Point() {
//        this.r = "2.0";
//    }


    public String toJSON() {
        return "{" +
                "\"x\":" + "\"" + this.x + "\"" + "," +
                "\"y\":" + "\"" + this.y + "\"" + "," +
                "\"r\":" + "\"" + this.r + "\"" + "," +
                "\"time\":" + "\"" + this.time + "\"" + "," +
                "\"hit\":" + "\"" + this.hit + "\"" +
                "}";
    }

    public String toMessage() {
        return "Проверка точки (" + this.x + "; " + this.y + ")\n" +
                "Параметр: " + this.r + "\n" +
                "Время отправки: " + this.time + "\n" +
                "Результат: " + this.hit;
    }

    public void setHit() {
        this.hit = checkHit(this.x, this.y, this.r);
    }

    private boolean checkTriangle(double x, double y, double r) {
        return ((x >= 0) && (y >= 0) && (y <= - 2 * x + r));
    }

    private boolean checkRectangle(double x, double y, double r) {
        return ((x >= 0) && (y <= 0) && (x <= r) && (y >= -r / 2));
    }

    private boolean checkCircle(double x, double y, double r) {
        return ((x <= 0) && (y <= 0) && (x * x + y * y <= r / 2 * r / 2));
    }

    private boolean checkHit(double x, double y, double r) {
        if (r > 0) {
            return (checkTriangle(x, y, r) || checkRectangle(x, y, r) || checkCircle(x, y, r));
        } else if (r < 0){
            x = -x;
            y = -y;
            r = Math.abs(r);
            return ((x >= 0) && (y >= 0) && (x * x + y * y <= r / 2 * r / 2) ) || // проверили попадание в инвертированный круг
                    ((x <= 0) && (y >= 0) && (x >= -r) && (y <= r / 2)) || // попадание в инв прямоугольник
                    ((x <= 0) && (y <= 0) && (y >= -x * 2 - r)); // попадание в инв треугольник
        } else {
            return false;
        }
    }
}