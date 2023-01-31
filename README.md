# CO2 Absorption Calculator
University Group Project under mentoring of Kainos company representative.

The goal of this project is to pass the semester, and create a proof of concept algorithm, that calculates how much CO2 will a forest absorb. As a 2 person project, work is splitted into backend and frontend.

# Contributors

@darnoker (Konrad Głąb), @WoollyAndWooden (Daniel Knopf). Students at the University of Gdańsk.

# Backend

Project located in the /backend directory, developed using SpringBoot framework:

Used technologies: <br />
- Java 17 
- Spring Boot 2.7.5 
- Maven 3.8.6 

Libraries used:
- Apache HttpClient
- Junit 5 <br />

You can use `mvn package / mvnw package`, then Maven will compile and run tests <br />
Command `mvn spring-boot:run / mvnw spring-boot:run` will run the application. 

# Frontend

Project located in the /frontend directory. Developed using React framework.

Used technologies: <br />
- React 18.2.0
- react-bootstrap 2.7.0
- pally-ci testing tool


# Running App

StartApp.bat is responsible for running the application. If called without parameters, it will start both backend and frontend and its tests.

Firt parameter:

- backend
- frontend
- full (both backend and frontend)

Second parameter

- run
- test
- install

