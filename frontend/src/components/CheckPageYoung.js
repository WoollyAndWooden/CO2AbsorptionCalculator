import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import PopupYoung from './PopupYoung'
import PopupPercentage from './PopupPercentage'

export default function CheckPageYoung() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [result, setResult] = useState(0)
    const [popupIndex, setPopupIndex] = useState(null);
    const inputRef = useRef()
    const buttonRef = useRef(null);
    const [isPercentageSelected, setIsPercentageSelected] = useState(false);
    const youngDataLabels = [
        'Las', 
        'Pole powierzchni (m2)', 
        'Rodzaj podłoża', 
        'Dominujący Gatunek 1', 
        'Dominujący Gatunek 2', 
        'Dominujący Gatunek 3', 
        'Liczba drzew', 
        'Gleba', 
        'Rezerwy Wody', 
        'Wysokość n.p.m', 
        'Lokacja'
    ]

    const buttonsYoung = Array.from({ length: 11 }, (_, i) => (
        <Button type='button' className='somebutton' key={i} onClick={() => handleButtonClick(i)}>Edytuj</Button>
      ));


    function generateYoungForestTableRows(dataLabels, choiceList) {
    let indexLable = 0
    return choiceList.map((_, index) => {
        if(index === 0) {
            return (
                <tr key={index}>
                    <td>{dataLabels[indexLable++]}</td>
                    <td>{choiceList[index].value}</td>
                </tr>
            )
        }  
        else if (index === 3) {
            indexLable-=1
            return choiceList[index].map((subElement, subIndex) => {
                indexLable++
                
                return (
                    <tr key={subIndex}>
                    <td>{dataLabels[indexLable]}</td>
                    <td>{subElement} {choiceList[index + 1][subIndex]}%</td>
                    {subIndex === 0 && (
                        <div>
                            {buttonsYoung[indexLable]}
                        </div>
                    )}
                    
                    </tr>
                )
             
                });
        } else if (index === 4) {
            indexLable++
            return null;
        } else  {
            return (
                <tr key={index}>
                    <td>{dataLabels[indexLable]}</td>
                    <td>{choiceList[index].value}</td>
                    {buttonsYoung[indexLable++]}
                </tr>
            );
        }
    });
    }

    function updateChoiceList(val) {
    setChoiceList(val)
    }

    function updatePopupIndex(val) {
    setPopupIndex(val)
    }

    function updatePopupIndexPercentage(val) {
        setIsPercentageSelected(false)
        setPopupIndex(val)
    }

    function handleButtonClick(index) {
        if(index >= 3 && index <= 5) {
            setIsPercentageSelected(true);
        }
        setPopupIndex(index);
    }


    function callApi() {
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

    return (
        <body>
            <div className="centerdiv fade-in checkCenter">
                <h2 className="checkHeader">Wybrane Opcje:</h2>
                    <Form className='next content young'>

                        <table className='table-style'>
                            {generateYoungForestTableRows(youngDataLabels, choiceList)}
                        </table>
                        
                        {popupIndex != null && !isPercentageSelected &&
                            <PopupYoung
                            index = {popupIndex} 
                            list = {choiceList} 
                            inputRef = {inputRef} 
                            onListUpate = {updateChoiceList} 
                            onPopupIndexUpdate = {updatePopupIndex}
                        />}

                        {popupIndex != null && isPercentageSelected &&
                            <PopupPercentage
                            index = {popupIndex} 
                            list = {choiceList} 
                            inputRef = {inputRef} 
                            onListUpate = {updateChoiceList} 
                            onPopupIndexUpdate = {updatePopupIndexPercentage}
                        />}


                    </Form>
                    <div className='forlink'>
                        <Link className='endlink' to={{
                            pathname: '/season',
                            state: {
                            state: choiceList.slice(0, -1)
                            }
                        }}>Wróć</Link>
                        <Button className='link' ref={buttonRef} onClick={callApi}>Oblicz</Button>

                    </div>

                    
                    <Link className='endlink' to={{ pathname: '/' }}>Wróć do początku</Link>


                    <div className='result'>

                        <label>Wynik: &nbsp;</label>
                        <label>{result} t/ha</label>
                    </div>
            </div>
        </body>
    )   
}
