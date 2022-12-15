import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function DegreePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const degrees = ["naturalne", "o znamionach siedlisk naturalnych", "półnaturalne"]

    function handleChange(event){
        if(choiceList.length === 4) {
            choiceList.pop()
        }
        const value = event.target.value
        var percentage;
        switch(value){
            case 'naturalne':
                percentage = 1 // to change
                break
            case 'o znamionach siedlisk naturalnych':
                percentage = 2 // to change
                break
            case "półnaturalne":
                percentage = 3 // to change
                break
        }

        const newList = choiceList.concat(percentage)
        setChoiceList(newList)
    }

    return (
        <div>
            <div className="centerdiv">
                <h2>Stopień Naturalności:</h2>
                <form>
                    {degrees.map(element => (
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
                        pathname: '/notimplemented',
                        state: {
                            state: choiceList
                        }
                    }}>Oblicz</Link>
                </form>
            </div>
        </div>
    )
}
