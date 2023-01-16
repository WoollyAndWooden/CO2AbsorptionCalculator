import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function GrowingSeasonPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const places = [
        "woj. suwalskie", "woj. warmińsko - mazurskie", "woj. podlaskie", "Mazowsze wschodnie",
        "woj. lubelskie", "woj. podkarpackie", "woj. małopolskie", "woj. łódzkie", "Mazowsze zachodnie i południowe",
        "woj. kujawsko - pomorskie", "woj.pomorskie", "woj. zachodniopomorskie", "woj. wielkopolskie", "woj. lubuskie",
        "woj .dolnośląskie", "woj. opolskie", "woj. świętkorzyskie", "woj. śląskie", "Kotlina Kłodzka", "Szczecin i okolice",
        "Poznań i okolice", "Pasmo wysokich Tatr i Sudetów"
    ]

    function handleChange(event){
        if(choiceList.length === 9) {
            choiceList.pop()
        }
        const value = event.target.value
        var choice = {value: value}
    
        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    return (
        <div className='bg'>
            <div className="centerdiv">
                <h2>Wysokość n.p.m</h2>
                <form>
                    {places.map(element => (
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
                        pathname: '/check',
                        state: {
                            state: choiceList
                        }
                    }}>Oblicz</Link>
                </form>
            </div>
        </div>
    )
}
