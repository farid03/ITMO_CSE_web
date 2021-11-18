package servlets;

import model.Point;
import model.Results;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class AreaCheckServlet extends HttpServlet {

    public void init() {
        this.getServletContext().setAttribute("Collection", new Results());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        PrintWriter out = response.getWriter();
        if ((request.getParameter("x") != null) &&
                (request.getParameter("y") != null) &&
                (request.getParameter("r") != null) &&
                (request.getParameter("time") != null)) {
            try {
                double x = Double.parseDouble(request.getParameter("x"));
                double y = Double.parseDouble(request.getParameter("y"));
                int r = Integer.parseInt(request.getParameter("r"));
                Results res = (Results) getServletContext().getAttribute("Collection");
                String dataFormat = "HH:mm:ss dd/MM/yyyy";

                if (!validateR(r)) {
                    throw new NumberFormatException();
                }

                if (checkHit(x, y, r)) {
                    Point point = new Point(x, y, r, String.valueOf(new SimpleDateFormat(dataFormat)
                            .format(Calendar.getInstance().getTime())), String.valueOf(System.nanoTime() - startTime), "Попадание");
                    synchronized (res.getPoints()) {
                        res.getPoints().add(point);
                    }
                    if (request.getParameter("resource").equals("form")) {
                        getServletContext().getRequestDispatcher("/resultsTable.jsp").forward(request, response);
                    } else {
                        out.println(point.toJSON());
                    }

                } else {
                    Point point = new Point(x, y, r, String.valueOf(new SimpleDateFormat(dataFormat)
                            .format(Calendar.getInstance().getTime())), String.valueOf(System.nanoTime() - startTime), "Промах");
                    synchronized (res.getPoints()) {
                        res.getPoints().add(point);
                    }
                    if (request.getParameter("resource").equals("form")) {
                        getServletContext().getRequestDispatcher("/resultsTable.jsp").forward(request, response);
                    } else {
                        out.println(point.toJSON());
                    }
                }
            } catch (NumberFormatException | ServletException e) {
                out.print("Invalid-data");
                e.printStackTrace();
            } finally {
                out.close();
            }
        }
    }

    private boolean validateTimeZoneOffset(int time) {
        return (-12 * 60 <= time) && (14 * 60 >= time);
    }

    private boolean validateY(double y) {
        double y_max = 2;
        double y_min = -2;

        return (y >= y_min) && (y <= y_max);
    }

    private boolean validateR(int r) {
        if (r == 1 || r == 2 || r == 3 || r == 4 || r == 5) {
            return true;
        } else {
            return false;
        }
    }

    private boolean validateX(double x) {
        double x_max = 3;
        double x_min = -5;

        return (x >= x_min) && (x <= x_max);
    }

    private boolean checkTriangle(double x, double y, double r) {
        return ((x >= 0) && (y >= 0) && (x + y - r/2 <= 0));
    }

    private boolean checkRectangle(double x, double y, double r) {
        return ((x <= 0) && (y <= 0) && (x >= -r) && (y >= -r / 2));
    }

    private boolean checkCircle(double x, double y, double r) {
        return ((x >= 0) && (y <= 0) && (x * x + y * y <= r * r));
    }

    private boolean checkHit(double x, double y, double r) {
        return (checkTriangle(x, y, r) || checkRectangle(x, y, r) || checkCircle(x, y, r));
    }
}
