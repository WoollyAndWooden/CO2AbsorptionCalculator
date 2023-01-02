import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './css/page.css'


export default function AverageAgePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const ageGroups = ["30-50", "51-70", "71-90", "91-110", "111-130"]

    function handleChange(event){
        if(choiceList.length === 3) {
            choiceList.pop()
        }
        const newList = choiceList.concat({value: event.target.value})
        setChoiceList(newList)
    }

    return (
        <div>
            <div className="centerdiv">
                <h2>Średni wiek lasu:</h2>
                <form>
                    {ageGroups.map(element => (
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
                        pathname: '/habitat',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
            </div>
        </div>
    )
}