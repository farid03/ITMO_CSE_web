package model;

import java.util.ArrayList;

public class Results {
    private ArrayList<Point> points;

    public Results() {
        this.points = new ArrayList<>();
    }

    public Results(ArrayList<Point> points) {
        this.points = points;
    }

    public ArrayList<Point> getPoints() {
        return points;
    }

    public void setPoints(ArrayList<Point> points) {
        this.points = points;
    }
}
