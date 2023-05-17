import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getForestTypeChoice } from './MainPage';
import { getFormattedValue, getFormattedValueNoObject } from './AreaPage';
import { getChoiceValue } from './AverageAgePage';
import { getSoilMoistureChoice } from './SoilMoisturePage';
import { getMaslChoice } from './MaslPage';

export default function PopupYoung({index, list, inputRef, onListUpate, onPopupIndexUpdate}) {

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
                const groundTypes = ["po wyrębie", "porolna", "łąka"]
                setOptions(groundTypes)
                setLoading(false)
                break;
            case 3:
                setLoading(false)
                break
            case 4:
                setLoading(false)
                break
            case 5:
                setLoading(false)
                break
            case 6:
                const numberOfSeeds = ["800 - 1200", "1200 - 1800"]
                setOptions(numberOfSeeds)
                setLoading(false)
                break
            case 7:
                axios.get('http://localhost:8080/api/soilMoisture/all')
                .then(response => {
                    const newOptions = response.data.map(obj => obj.soil);
                    setOptions(newOptions);
                    setLoading(false)

                })  
                .catch(error => console.log(error));
                break;
            case 8:
                setOptions(['Są', 'Brak']);
                setLoading(false)

                break;
            case 9:
                axios.get('http://localhost:8080/api/masl/all')
                .then(response => {
                    const newOptions = response.data.map(obj => obj.landForm);
                    setOptions(newOptions);
                    setLoading(false)

                })  
                .catch(error => console.log(error));
                break;
            case 10:
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
                {index < 3 && <h1>{list[index].value}</h1>}
                {index >= 3 && index <= 5 && <h1>{list[4][index - 3]}</h1>}
                {index > 5 && <h1>{list[index - 1].value}</h1>}
                {index === 1 || index === 3  || index === 4 || index === 5 ?  (
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

    function modifyChoiceList(index) {
        console.log('Inside modifyChoiceList')
        const value = inputRef.current.value
        console.log(options)
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
                choice = getFormattedValueNoObject(value)
                break;
            case 4:
                choice = getFormattedValueNoObject(value)
                break;
            case 5:
                choice = getFormattedValueNoObject(value)
                break
            case 6:
                choice = getChoiceValue(value)
                break
            case 7:
                choice = getSoilMoistureChoice(value)
                break
            case 8:
                choice = getMaslChoice(value)[0]
                break
            case 9:
                choice = getChoiceValue(value)
                break
            case 10:
                choice = getChoiceValue(value)
        }
        const updatedList = [...list]

        if(index === 3 || index === 4 || index === 5) {
            updatedList[4][index - 3] = choice

        } else if(index > 5) {
            updatedList[index - 1] = choice
        } else {
            updatedList[index] = choice

        }
        console.log(updatedList)
        onListUpate(updatedList)
      }
    
    
    function handleClosePopup(index) {
        modifyChoiceList(index)
        onPopupIndexUpdate(null);
    }

}
