import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function DegreePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const degrees = ["Naturalne", "O znamionach siedlisk naturalnych", "Półnaturalne"]

    function handleChange(event){
        setSelected(true)
        if(choiceList.length === 5) {
            choiceList.pop()
        }
        const value = event.target.value
        var choice;
        switch(value){
            case 'Naturalne':
                choice = {percentage: 1, value: 'Naturalne'}
                break
            case 'O znamionach siedlisk naturalnych':
                choice = {percentage: 0.8, value: 'O znamionach siedlisk naturalnych'}
                break
            case "Półnaturalne":
                choice = {percentage: 0.5, value: 'Półnaturalne'}
                break
        }

        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    function goToAnotherPage(event) {
        if(!isSelected) {
            event.preventDefault()
        }
    }

    return (
        <body>
            <div className="centerdiv">
                <h2>Stopień Naturalności:</h2>
                <form>
                    {degrees.map(element => (
                        <div>
                            <label className='contentValue  '>
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
                    <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/soil',
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
