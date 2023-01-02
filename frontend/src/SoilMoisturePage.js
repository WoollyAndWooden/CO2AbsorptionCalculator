import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SoilMoisturePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const soilMoisture = ["Bagienna", "Podmokła", "Wilgotna", "Pół wilgotna", "Sucha"]

    function handleChange(event){
        if(choiceList.length === 6) {
            choiceList.pop()
        }
        const value = event.target.value
        var choice;
        switch(value){
            case 'Bagienna':
                choice = {tag: 'swamp', value: value}
                break
            case 'Podmokła':
                choice = {tag : 'wet', value: value}
                break
            case "Wilgotna":
                choice = {tag : 'moist', value: value}
                break
            case "Pół wilgotna":
                choice = {tag : 'half-moist', value: value}
                break
            case "Sucha":
                choice = {tag : 'dry', value: value}
                break
        }

        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    return (
        <div>
            <div className="centerdiv">
                <h2>Wilgotność gleby:</h2>
                <form>
                    {soilMoisture.map(element => (
                        <div>
                            <label>
                                <input 
                                ref={inputRef}
                                name="radiobutton"
                                type="radio"
                                key={element} 
                                value={element}
                                onClick={(event) => handleChange(event)} 
                                />
                                {element}
                            </label>
                        </div>
                    ))}
                    <Link to={{
                        pathname: '/reservoir',
                        state: {
                            state: choiceList
                        }
                    }}>Oblicz</Link>
                </form>
            </div>
        </div>
    )
}
