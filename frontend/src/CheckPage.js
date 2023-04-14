import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import PopupMature from './PopupMature'

export default function CheckPage() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [result, setResult] = useState(0)
    const [popupIndex, setPopupIndex] = useState(null);
    const inputRef = useRef()
    const buttonRef = useRef(null);

    const buttons = Array.from({ length: 9 }, (_, i) => (
        <button type='button' className='somebutton' key={i} onClick={() => handleButtonClick(i)}>Edytuj</button>
      ));

    function updateChoiceList(val) {
    setChoiceList(val)
    }

    function updatePopupIndex(val) {
    setPopupIndex(val)
    }

   
    function handleButtonClick(index) {
        setPopupIndex(index);
    }


    function callApi() {
        if(choiceList[0].tag === 'mature') {
            axios.get('http://localhost:8080/calculateMature', {
                params: {
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
            axios.get('http://localhost:8080/calculateYoung', {
            params: {
                area: choiceList[1].value,
                groundType: choiceList[2].tag,
                dominantSpecies: choiceList[3].join(','),
                percentage: choiceList[4].join(','),
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

    if(choiceList[0].tag === 'mature') {
        return (
            <body>
                <div className="centerdiv fade-in checkCenter">
                    <h2 className="checkHeader">Wybrane Opcje:</h2>
                        <Form className='next content mature'>
                                <label className='column contentName'>Las</label>
                                <label className='column contentName'>Pole powierzchni</label>
                                <label className='column contentName'>Wiek</label>
                                <label className='column contentName'>Siedlisko</label>
                                <label className='column contentName'>Stopień</label>
                                <label className='column contentName'>Gleba</label>
                                <label className='column contentName'>Rezerwy Wody</label>
                                <label className='column contentName'>Wysokość n.p.m</label>
                                <label className='column contentName'>Lokacja</label>
                            {choiceList.map((element) => (
                                <label className='columnContentValue'>{element.value}</label>
                            ))}
                           {buttons.map((button, index) => (
                                <div key={index}>
                                    {index > 0 && button}
                                </div>
                            ))}
                            {popupIndex != null &&
                             <PopupMature
                             index = {popupIndex} 
                             list = {choiceList} 
                             inputRef = {inputRef} 
                             onListUpate = {updateChoiceList} 
                             onPopupIndexUpdate = {updatePopupIndex}
                            />}

                        </Form>
                        <Link className='endlink' to={{
                            pathname: '/season',
                            state: {
                                state: choiceList.slice(0, -1)
                            }
                        }}>Wróć</Link>
                    
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
    } else {
        return (
            <body>
                <div className="centerdiv fade-in checkCenter">
                    <h2 className="checkHeader">Wybrane Opcje:</h2>
                        <Form className='next content young'>
                                <label className="contentName">Las</label>
                                <label className="contentName">Pole powierzchni</label>
                                <label className="contentName">Rodzaj podłoża</label>
                                <label className="contentName">Dominujący Gatunek 1</label>
                                <label className="contentName">Dominujący Gatunek 2</label>
                                <label className="contentName">Dominujący Gatunek 3</label>
                                <label className="contentName">Liczba drzew</label>
                                <label className="contentName">Gleba</label>
                                <label className="contentName">Rezerwy Wody</label>
                                <label className="contentName">Wysokość n.p.m</label>
                                <label className="contentName">Lokacja</label>
                            {choiceList.map((element, index) => {
                                if (index === 3) {
                                    return choiceList[index].map((subElement, subIndex) => (
                                        <label className="contentValue" key={subIndex}>{subElement} {choiceList[index + 1][subIndex]}%</label>
                                    ));
                                } else if(index === 4) {
                                    return
                                } else {
                                    return (
                                        <label className="contentValue">{element.value}</label>
                                    );
                                }
                                })}
                        </Form>
                        <Link className='endlink' to={{
                            pathname: '/season',
                            state: {
                                state: choiceList.slice(0, -1)
                            }
                        }}>Wróć</Link>
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