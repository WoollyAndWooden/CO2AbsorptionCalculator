import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import PopupMature from './PopupMature'

export default function CheckPageMature() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [result, setResult] = useState(0)
    const [popupIndex, setPopupIndex] = useState(null);
    const inputRef = useRef()
    const buttonRef = useRef(null);
    const [isPercentageSelected, setIsPercentageSelected] = useState(false);
    const matureDataLabels = [
        'Las', 
        'Pole powierzchni (m2)', 
        'Wiek',
        'Siedlisko', 
        'Stopień', 
        'Gleba', 
        'Rezerwy Wody',
        'Wysokość n.p.m', 
        'Lokacja', 
    ]


    console.log(choiceList)

    const buttonsMature = Array.from({ length: 9 }, (_, i) => (
        <Button type='button' className='somebutton' key={i} onClick={() => handleButtonClick(i)}>Edytuj</Button>
      ));


    function generateMatureForestTableRows(dataLabels, choiceList) {
        let indexLabel = 0
        return choiceList.map((_, index) => {
            if(index === 0) {
                return (
                    <tr key={index}>
                        <td>{dataLabels[indexLabel++]}</td>
                        <td>{choiceList[index].value}</td>
                    </tr>
                )
            } else  {
                return (
                    <tr key={index}>
                        <td>{dataLabels[indexLabel]}</td>
                        <td>{choiceList[index].value}</td>
                        {buttonsMature[indexLabel++]}
                    </tr>
                )
            }
        })

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
}

    return (
        <body>
            <div className="centerdiv fade-in checkCenter">
                <h2 className="checkHeader">Wybrane Opcje:</h2>
                    <Form className='next content mature'>
                        <table className='table-style'>
                            {generateMatureForestTableRows(matureDataLabels, choiceList)}
                        </table>
                        {popupIndex != null &&
                            <PopupMature
                            index = {popupIndex} 
                            list = {choiceList} 
                            inputRef = {inputRef} 
                            onListUpate = {updateChoiceList} 
                            onPopupIndexUpdate = {updatePopupIndex}
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