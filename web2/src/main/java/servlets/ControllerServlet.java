package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp); // необходимо для навигации по страницам
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setCharacterEncoding("UTF-8");
            if ((request.getParameter("x") != null) && // отправляем запрос на AreaCheck
                    (request.getParameter("y") != null) &&
                    (request.getParameter("r") != null) &&
                    //(request.getParameter("time") != null) &&
                    (!Boolean.parseBoolean(request.getParameter("clear"))) &&
                    (request.getParameter("resource")) != null) {

                getServletContext().getRequestDispatcher("/AreaCheckServlet").forward(request, response);

            } else if (Boolean.parseBoolean(request.getParameter("clear"))) { // перенаправляем на сервлет, который очистит таблицу данных
                getServletContext().getRequestDispatcher("/Clear").forward(request, response);
            } else {
                getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
}
