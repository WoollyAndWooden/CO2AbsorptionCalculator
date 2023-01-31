#!/bin/bash


if [[ $1 -eq 0 ]]
then
	BACKEND='1'
	FRONTEND='1'
	RUN='1'
	TEST='1'
fi

if [[ $1 == "full" ]]
then
	BACKEND='1'
	FRONTEND='1'
fi

if [[ $1 == "backend" ]]
	then
		BACKEND='1'
fi
if [[ $1 == "frontend" ]]
	then
		FRONTEND='1'
fi

if [[ $2 == '0' ]]
then
	RUN='1'
	TEST='1'
fi

if [[ $2 == "run" ]]
then
	RUN='1'
fi
if [[ $2 == "test" ]]
then
	TEST='1'
fi
if [[ $2 == "install" ]]
then
	INSTALL='1'
fi

if [[ $INSTALL == '1' ]]
then
	if [[ $BACKEND == '1' ]]
	then
		cd ./backend/co2-absorption-calculator/
		mvn clean install
		cd ../..
	fi
	if [[ $FRONTEND == '1' ]]
	then
		cd ./frontend
		npm install
        npm install pa11y
        npm install pa11y-ci
		cd ..
	fi
fi

if [[ $RUN == '1' ]]
then
	if [[ $BACKEND == '1' ]]
	then
		cd ./backend/co2-absorption-calculator/
		mvn spring-boot:run &
		cd ../..
	fi
	if [[ $FRONTEND == '1' ]]
	then
		cd ./frontend
		npm start &
		cd ..
	fi
fi

if [[ $TEST == '1' ]]
then
	if [[ $BACKEND == '1' ]]
	then
		cd ./backend/co2-absorption-calculator/
		mvn package
		cd ../..
	fi
	if [[ $FRONTEND == '1' ]]
	then
		cd ./frontend
		start npm test
        start pa11y-ci
		cd ..
	fi
fi

