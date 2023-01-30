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
            if(choiceList[3].length === 1) {
                axios.get('http://localhost:8080/calculateYoungFirst', {
                    params: {
                        forest: choiceList[0].tag,
                        area: choiceList[1].value,
                        groundType: choiceList[2].tag,
                        dominantSpecies: choiceList[3][0],
                        percentage1: choiceList[4][0],
                        treeNumber: choiceList[5],
                        soil: choiceList[6].tag,
                        reservoir: choiceList[7].tag,
                        land: choiceList[8].tag,
                        location: choiceList[9].value,
                    }
                })
                .then(result => setResult(result.data))
                .catch(error => console.log(error))

            } else if(choiceList[3].length === 2) {
                axios.get('http://localhost:8080/calculateYoungSecond', {
                    params: {
                        forest: choiceList[0].tag,
                        area: choiceList[1].value,
                        groundType: choiceList[2].tag,
                        dominantSpecies1: choiceList[3][0],
                        dominantSpecies2: choiceList[3][1],
                        percentage1: choiceList[4][0],
                        percentage2: choiceList[4][1],
                        treeNumber: choiceList[5],
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
                <div className="centerdiv">
                    <h2>Wybrane Opcje:</h2>
                    <Form className='next'>
                        <div className='column'>
                            <label>Las</label>
                            <label>Pole powierzchni</label>
                            <label>Wiek</label>
                            <label>Siedlisko</label>
                            <label>Stopień</label>
                            <label>Gleba</label>
                            <label>Rezerwy Wody</label>
                            <label>Ukształtowanie terenu</label>
                            <label>Lokacja</label>
                        </div>
                        <div className='column'>
                        {choiceList.map(element => (
                            <div >
                                <label>{element.value}</label>
                            </div>             
                        ))}
                        </div>
                    </Form>
                    <div className='result'>
                        <label>Wynik: &nbsp;</label>
                        <label>{result} t/ha</label>
                    </div>
                    
                    <Button ref={buttonRef} onClick={callApi}>Oblicz</Button>
        
                        <Link className='link' to={{
                                pathname: '/',
                            }}>Wróć do początku</Link>
                </div>
            </div>
          )
    } else {
        return (
            <div className='bg'>
                <div className="centerdiv">
                    <h2>Wybrane Opcje:</h2>
                    <Form className='next'>
                        <div className='column'>
                            <label>Las</label>
                            <label>Pole powierzchni</label>
                            <label>Rodzaj podłoża</label>
                            <label>Dominujące Gatunki</label>
                            <label>Liczba drzew</label>
                            <label>Gleba</label>
                            <label>Rezerwy Wody</label>
                            <label>Ukształtowanie terenu</label>
                            <label>Lokacja</label>
                        </div>
                        <div className='column'>
                        {choiceList.map((element, index) => {
                            if (index === 3) {
                                return choiceList[index].map((subelement, subindex) => (
                                <div className='column'>
                                    <label key={subindex}>{subelement}</label>
                                </div>
                                ));
                            } else {
                                return (
                                    <div>
                                    <label>{element.value}</label>
                                    </div>
                                );
                            }
                            })}
                        </div>
                    </Form>
                    <div className='result'>
                        <label>Wynik: &nbsp;</label>
                        <label>{result} t/ha</label>
                    </div>
                    
                    <Button ref={buttonRef} onClick={callApi}>Oblicz</Button>
        
                        <Link className='link' to={{
                                pathname: '/',
                            }}>Wróć do początku</Link>
                </div>
            </div>
        )   
    }
    
  
}
