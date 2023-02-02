import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'


export default function CheckPage() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [result, setResult] = useState(0)
    const buttonRef = useRef(null);

    function callApi() {

        if(choiceList[0].tag === 'mature') {
            axios.get('http://localhost:8080/calculateMature', {
                params: {
                    forest: choiceList[0].tag,
                    area: choiceList[1].value,
                    age: choiceList[2].value,
                    habitat: choiceList[3].value,
                    degree: choiceList[4].percentage,
                    soil: choiceList[5].tag,
                    reservoir: choiceList[6].tag,
                    land: choiceList[7].tag,
                    location: choiceList[8].value,
                }
            })
            .then(result => setResult(result.data))
            .catch(error => console.log(error))

        } else {
            if(choiceList[3].filter(element => element === 'brak').length === 2) {
                axios.get('http://localhost:8080/calculateYoungFirst', {
                    params: {
                        forest: choiceList[0].tag,
                        area: choiceList[1].value,
                        groundType: choiceList[2].tag,
                        dominantSpecies: choiceList[3][0],
                        percentage: choiceList[4][0],
                        treeNumber: choiceList[5].value,
                        soil: choiceList[6].tag,
                        reservoir: choiceList[7].tag,
                        land: choiceList[8].tag,
                        location: choiceList[9].value,
                    }
                })
                .then(result => setResult(result.data))
                .catch(error => console.log(error))

            } else if(choiceList[3].filter(element => element === 'brak').length === 1) {
                axios.get('http://localhost:8080/calculateYoungSecond', {
                    params: {
                        forest: choiceList[0].tag,
                        area: choiceList[1].value,
                        groundType: choiceList[2].tag,
                        dominantSpecies1: choiceList[3][0],
                        dominantSpecies2: choiceList[3][1],
                        percentage1: choiceList[4][0],
                        percentage2: choiceList[4][1],
                        treeNumber: choiceList[5].value,
                        soil: choiceList[6].tag,
                        reservoir: choiceList[7].tag,
                        land: choiceList[8].tag,
                        location: choiceList[9].value,
                    }
                })
                .then(result => setResult(result.data))
                .catch(error => console.log(error))
            } else {
                axios.get('http://localhost:8080/calculateYoungThird', {
                    params: {
                        forest: choiceList[0].tag,
                        area: choiceList[1].value,
                        groundType: choiceList[2].tag,
                        dominantSpecies1: choiceList[3][0],
                        dominantSpecies2: choiceList[3][1],
                        dominantSpecies3: choiceList[3][2],
                        percentage1: choiceList[4][0],
                        percentage2: choiceList[4][1],
                        percentage3: choiceList[4][2],
                        treeNumber: choiceList[5].value,
                        soil: choiceList[6].tag,
                        reservoir: choiceList[7].tag,
                        land: choiceList[8].tag,
                        location: choiceList[9].value,
                    }
                })
                .then(result => setResult(result.data))
                .catch(error => console.log(error))
            }
        }


    }

    if(choiceList[0].tag === 'mature') {
        return (
            <div className='bg'>
                <div className="centerdiv checkCenter">
                    <h2 className="checkHeader">Wybrane Opcje:</h2>
                        <Form className='next content'>
                                <label className='column contentName'>Las</label>
                                <label className='column contentName'>Pole powierzchni</label>
                                <label className='column contentName'>Wiek</label>
                                <label className='column contentName'>Siedlisko</label>
                                <label className='column contentName'>Stopień</label>
                                <label className='column contentName'>Gleba</label>
                                <label className='column contentName'>Rezerwy Wody</label>
                                <label className='column contentName'>Ukształtowanie terenu</label>
                                <label className='column contentName'>Lokacja</label>
                            {choiceList.map(element => (
                                    <label  className='column contentValue'>{element.value}</label>
                            ))}
                        </Form>
                    
                        <Link className='endlink' to={{
                                pathname: '/',
                            }}>Wróć do początku</Link>

                        <Button className='cos' ref={buttonRef} onClick={callApi}>Oblicz</Button>
`                       
                        <div className='result'>
                            <label>Wynik: &nbsp;</label>
                            <label>{result} t/ha</label>
                        </div>
                    


                </div>
            </div>
          )
    } else {
        return (
            <body>
                <div className="centerdiv checkCenter">
                    <h2 className="checkHeader">Wybrane Opcje:</h2>
                        <Form className='next content'>
                                <label className="contentName">Las</label>
                                <label className="contentName">Pole powierzchni</label>
                                <label className="contentName">Rodzaj podłoża</label>
                                <label className="contentName">Dominujący Gatunek 1</label>
                                <label className="contentName">Dominujący Gatunek 2</label>
                                <label className="contentName">Dominujący Gatunek 3</label>
                                <label className="contentName">Liczba drzew</label>
                                <label className="contentName">Gleba</label>
                                <label className="contentName">Rezerwy Wody</label>
                                <label className="contentName">Ukształtowanie terenu</label>
                                <label className="contentName">Lokacja</label>
                            {choiceList.map((element, index) => {
                                if (index === 3) {
                                    return choiceList[index].map((subelement, subindex) => (
                                        <label className="contentValue" key={subindex}>{subelement}</label>
                                    ));
                                } else {
                                    return (
                                        <label className="contentValue">{element.value}</label>
                                    );
                                }
                                })}
                        </Form>
                        <Link className='endlink' to={{
                                pathname: '/',
                            }}>Wróć do początku</Link>

                        <Button className='cos' ref={buttonRef} onClick={callApi}>Oblicz</Button>
`                       
                        <div className='result'>
                            <label>Wynik: &nbsp;</label>
                            <label>{result} t/ha</label>
                        </div>
                </div>
            </body>
        )   
    }
    
  
}