@ECHO OFF

:SETUP
SET BACKEND=
SET FRONTEND=
SET TEST=
SET RUN=
SET INSTALL=
SET BACKEND_PATH=backend\co2-absorption-calculator\Tools\
SET FRONTEND_PATH=frontend\Tools\

ECHO %1
ECHO %2
IF "%1" == "backend" (
    SET BACKEND="1"
)
IF "%1" == "frontend" (
    SET FRONTEND="1"
)
IF "%1" == "full" (
    SET BACKEND="1"
    SET FRONTEND="1"
)
IF "%2" == "test" (
    SET TEST="1"
)
IF "%2" == "run" (
    SET RUN="1"
)
IF "%2" == "" (
    SET TEST="1"
    SET RUN="1"
)
IF "%2" == "install" (
    SET INSTALL="1"
)


IF "%1" == "" (
    SET BACKEND="1"
    SET FRONTEND="1"
    SET TEST="1"
    SET RUN="1"
)
 ECHO %BACKEND%
 ECHO %RUN%
:RUN
IF %RUN% == "1" (
    IF %BACKEND% == "1" (
        CD backend\co2-absorption-calculator\
        start mvn spring-boot:run
        CD ../..
    )
    IF %FRONTEND% == "1" (
        CD frontend\
        start npm start
        CD ..
    )
)
IF %TEST% == "1" (
    IF %BACKEND% == "1" (
        CD backend\co2-absorption-calculator\
        start mvn package
        CD ../..
    )
    IF %FRONTEND% == "1" (
        CD frontend\
        start npm test
        start pa11y-ci
        CD ..
    )
)

IF %INSTALL% == "1" (
    IF %BACKEND% == "1" (
        CD backend\co2-absorption-calculator\
        start mvn clean install
        CD ../..
    )
    IF %FRONTEND% == "1" (
        CD frontend\
        start npm install
        start npm install pa11y
        start npm install pa11y-ci
        CD ..
    )
)
