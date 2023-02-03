import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/page.css'


export default function AverageAgePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const ageGroups = ["30-50", "51-70", "71-90", "91-110", "111-130"]

    function handleChange(event){
        setSelected(true)
        if(choiceList.length === 3) {
            choiceList.pop()
        }
        const newList = choiceList.concat({value: event.target.value})
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
                <h2>Średni wiek lasu:</h2>
                <form>
                    {ageGroups.map(element => (
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
                        pathname: '/habitat',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                </div>
                
            </div>
        </body>
    )
}