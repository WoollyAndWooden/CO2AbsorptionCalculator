import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import { getForestTypeChoice } from './MainPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getFormattedValue } from './AreaPage'
import { getChoiceValue } from './AverageAgePage'
import { getDegreeChoice } from './DegreePage'
import { getSoilMoistureChoice } from './SoilMoisturePage'
import { getWaterReservoirChoice } from './WaterReservoirPage'
import { getMaslChoice } from './MaslPage'


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

    function modifyChoiceList(index) {
        const value = inputRef.current.value
        let choice
        switch(index) {
            case 0:
                choice = getForestTypeChoice(value)
                break;
            case 1:
                choice = getFormattedValue(value)
                break;
            case 2:
                choice = getChoiceValue(value)
                break;
            case 3:
                choice = getChoiceValue(value)
                break;
            case 4:
                choice = getDegreeChoice(value)
                break;
            case 5:
                choice = getSoilMoistureChoice(value)
                break
            case 6:
                choice = getWaterReservoirChoice(value)
                break
            case 7:
                choice = getMaslChoice(value)[0]
                break
            case 8:
                choice = getChoiceValue(value)
                break


        }
        const updatedList = [...choiceList]
        updatedList[index] = choice
        setChoiceList(updatedList)
        
      }


    function Popup({index}) {
        console.log('rendered ' + index)
        const [options, setOptions] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            switch(index) {
                case 0:
                    setOptions(['Dojrzałe lasy', 'Młode lasy']);
                    setLoading(false)
                    break;
                case 1:
                    setLoading(false)
                    break
                case 2:
                    axios.get('http://localhost:8080/api/averageAge/all')
                    .then(response => {
                        const newOptions = response.data.map(obj => obj.ageInterval);
                        setOptions(newOptions);
                        setLoading(false)
                    })  
                    .catch(error => console.log(error));
                    break;
                case 3:
                    axios.get('http://localhost:8080/api/habitat/all')
                    .then(response => {
                        const newOptions = response.data.map(obj => obj.name);
                        setOptions(newOptions);
                        setLoading(false)

                    })  
                    .catch(error => console.log(error));
                    break;
                case 4:
                    axios.get('http://localhost:8080/api/degree/all')
                    .then(response => {
                        const newOptions = response.data.map(obj => obj.name);
                        setOptions(newOptions);
                        setLoading(false)

                    })  
                    .catch(error => console.log(error));
                    break;
                case 5:
                    axios.get('http://localhost:8080/api/soilMoisture/all')
                    .then(response => {
                        const newOptions = response.data.map(obj => obj.soil);
                        setOptions(newOptions);
                        setLoading(false)

                    })  
                    .catch(error => console.log(error));
                    break;
                case 6:
                    setOptions(['Są', 'Brak']);
                    setLoading(false)

                    break;
                case 7:
                    axios.get('http://localhost:8080/api/masl/all')
                    .then(response => {
                        const newOptions = response.data.map(obj => obj.landForm);
                        setOptions(newOptions);
                        setLoading(false)

                    })  
                    .catch(error => console.log(error));
                    break;
                case 8:
                    axios.get('http://localhost:8080/api/location/all')
                    .then(response => {
                        const newOptions = response.data.map(obj => obj.name);
                        setOptions(newOptions);
                        setLoading(false)
                    })  
                    .catch(error => console.log(error));
                    break;
            }
        }, [index]);

        if(!loading) {
            return (
                <div className='popup fade-in'>
                    <h1>{choiceList[index].value}</h1>
                    {index == 1 ?  (
                        <input type='number' ref={inputRef}/>
                        
                    ) : (
                        <select ref={inputRef}>
                            {options.map((option, optionIndex) => {
                                return <option index={optionIndex} value={option} >{option}</option>
                            })}
                        </select>

                    )}
                    
                    <button onClick={() => handleClosePopup(index)}>Close Popup</button>
                </div>
            );
        }
    }
    
    function handleButtonClick(index) {
        setPopupIndex(index);
    }

    function handleClosePopup(index) {
        modifyChoiceList(index)
        setPopupIndex(null);
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
                            {popupIndex != null && <Popup index={popupIndex} onClose={handleClosePopup} />}

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
                                    return choiceList[index].map((subelement, subindex) => (
                                        <label className="contentValue" key={subindex}>{subelement}</label>
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