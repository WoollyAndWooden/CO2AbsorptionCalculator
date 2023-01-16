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
        if(choiceList.length === 5) {
            choiceList.pop()
        }
        const value = event.target.value
        var choice;
        switch(value){
            case 'naturalne':
                choice = {percentage: 1, value: 'naturalne'}
                break
            case 'o znamionach siedlisk naturalnych':
                choice = {percentage: 0.8, value: 'o znamionach siedlisk naturalnych'}
                break
            case "półnaturalne":
                choice = {percentage: 0.5, value: 'półnaturalne'}
                break
        }

        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    return (
        <div className='bg'>
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
                   <Link className='link' to={{
                        pathname: '/soil',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
            </div>
        </div>
    )
}
