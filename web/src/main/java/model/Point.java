package model;

public class Point {
    private double x;
    private double y;
    private int r;
    private String currentTime;
    private String scriptTime;
    private String hit;

    public Point(double x, double y, int r, String currentTime, String scriptTime, String hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
        this.scriptTime = scriptTime;
        this.hit = hit;
    }

    public double getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public String getScriptTime() {
        return scriptTime;
    }

    public void setScriptTime(String scriptTime) {
        this.scriptTime = scriptTime;
    }

    public String getHit() {
        return hit;
    }

    public void setHit(String hit) {
        this.hit = hit;
    }

    public String toJSON() {
        return "{" +
                "\"x\":" + "\"" + this.getX() + "\"" + "," +
                "\"y\":" + "\"" + this.getY() + "\"" + "," +
                "\"r\":" + "\"" + this.getR() + "\"" + "," +
                "\"currentTime\":" + "\"" + this.getCurrentTime() + "\"" + "," +
                "\"scriptTime\":" + "\"" + String.valueOf(this.scriptTime) + "\"" + "," +
                "\"hit\":" + "\"" + this.getHit() + "\"" +
                "}";
    }
}
