package beans;

public class Validator {
    public static boolean isValidDate(Point point) {
        try {
            if (point.getX() != null && point.getY() != null && point.getR() != null) {
                if (point.getX().length() > 8) {
                    point.setX(point.getX().substring(0, 7));
                }
                if (point.getY().length() > 8) {
                    point.setY(point.getY().substring(0, 7));
                }
                if (point.getR().length() > 8) {
                    point.setR(point.getR().substring(0, 7));
                }
                double x = Double.parseDouble(point.getX().replace(",", "."));
                double y = Double.parseDouble(point.getY().replace(",", "."));
                double r = Double.parseDouble(point.getR().replace(",", "."));

                point.setX(String.valueOf(x));
                point.setY(String.valueOf(y));
                point.setR(String.valueOf(r));
                point.setHit(checkArea(x, y, r) ? "Попадание" : "Промах");
                return true;
            }
        } catch (NumberFormatException e) {
            System.err.println("Намберфарматексепшн!!1!\n " + "Введенные строки (x, y, r): " + point.toJSON());;
            return false;
        }
        return false;
    }

    public static boolean checkArea(double x, double y, double r) {
        return (checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r));
    }

    public static boolean checkRectangle(double x, double y, double r) {
        return x >= 0 && y >= 0 && x <= r / 2 && y <= r;
    }

    public static boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= 2 * x - r;
    }

    public static boolean checkCircle(double x, double y, double r) {
        return x <= 0 && y <= 0 && x * x + y * y <= r * r / 4;
    }

    public static boolean isValid(double x, double y, double r) {
        return (x >= -4 && x <= 4) && (y > -3 && y < 5) && (r >= 2 && r <= 5);
    }
}
