# Todo Task Application

A full stack todo application built using Angular, Nodejs, Express, MySQL and dockerized using Docker Compose

1. Clone the repository
   -git clone https://github.com/Ranul00/todo-application-angular14.git
   -cd todo-application-angular14

2. Runt the application with Docker compose
   -docker-compose up --build
   -this will build and start the frontend(port 80), backend(port 3000) and MySQL db(port 3307)

3. Open the application
   -Frontend -> http://localhost open this in your browser
   -Backend -> this can be accessible in http://localhost:300

4. Stop the application
   -docker-compose down -v
