import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getForestTypeChoice } from './MainPage';
import { getFormattedValue } from './AreaPage';
import { getChoiceValue } from './AverageAgePage';
import { getDegreeChoice } from './DegreePage';
import { getSoilMoistureChoice } from './SoilMoisturePage';
import { getWaterReservoirChoice } from './WaterReservoirPage';
import { getMaslChoice } from './MaslPage';



export default function PopupMature({index, list, inputRef, onListUpate, onPopupIndexUpdate}) {
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
                <h1>{list[index].value}</h1>
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

    function modifyChoiceList(index) {
        console.log('Inside modifyChoiceList')
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
        const updatedList = [...list]
        updatedList[index] = choice
        onListUpate(updatedList)
      }
    
    
    function handleClosePopup(index) {
        modifyChoiceList(index)
        onPopupIndexUpdate(null);
    }
    
}

