import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function GrowingSeasonPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [isSelected, setSelected] = useState(false)    

    const inputRef = useRef()
    const places = [
        "woj. suwalskie", "woj. warmińsko - mazurskie", "woj. podlaskie", "Mazowsze wschodnie",
        "woj. lubelskie", "woj. podkarpackie", "woj. małopolskie", "woj. łódzkie", "Mazowsze zachodnie i południowe",
        "woj. kujawsko - pomorskie", "woj.pomorskie", "woj. zachodniopomorskie", "woj. wielkopolskie", "woj. lubuskie",
        "woj .dolnośląskie", "woj. opolskie", "woj. świętkorzyskie", "woj. śląskie", "Kotlina Kłodzka", "Szczecin i okolice",
        "Poznań i okolice", "Pasmo wysokich Tatr i Sudetów"
    ]

    function handleChange(event){
        setSelected(true)
        if(choiceList[0].tag === 'mature') {
            if(choiceList.length === 9) {
                choiceList.pop()
            }
        } else {
            if(choiceList.length === 10) {
                choiceList.pop()
            }
        }
        const value = event.target.value
        var choice = {value: value}
    
        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    function goToAnotherPage(event) {
        if(!isSelected) {
            alert("Nie wybrałeś żadnej opcji!")
            event.preventDefault()
        }
    }

    return (
        <body>
            <div className="centerdiv">
                <h2>Lokacja</h2>
                <form>
                    {places.map(element => (
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
                    
                </form>

                <div className='forlink'>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/check',
                        state: {
                            state: choiceList
                        }
                    }}>Oblicz</Link>

                </div>

                
            </div>
        </body>
    )
}
