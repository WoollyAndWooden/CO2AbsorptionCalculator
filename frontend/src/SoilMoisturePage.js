import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SoilMoisturePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const soilMoisture = ["Bagienna", "Podmokła", "Wilgotna", "Pół wilgotna", "Sucha"]

    function handleChange(event){
        setSelected(true)
        if(choiceList[0].tag === 'mature') {
            if(choiceList.length === 6) {
                choiceList.pop()
            }
        } else {
            if(choiceList.length === 7) {
                choiceList.pop()
            }
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


    function goToAnotherPage(event) {
        if(!isSelected) {
            alert("Nie została wybrana żadna opcja!")
            event.preventDefault()
        }
    }

    return (
        <body>
            <div className="centerdiv fade-in">
                <h2>Wilgotność gleby:</h2>
                <form>
                    {soilMoisture.map(element => (
                        <div>
                            <label>
                                <input
                                className='radio' 
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

                    <div className='forlink'>
                    {choiceList[0].tag ==='mature' ? (
                        <Link className='endlink' to={{
                            pathname: '/degree',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link> 

                    ) : (
                        <Link className='endlink' to={{
                            pathname: '/howmanytrees',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link> 
                    )}
                    
                    <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/reservoir',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                    </div>
                    
                </form>
            </div>
        </body>
    )
}
