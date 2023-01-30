import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function GroundTypePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const inputRef = useRef()
    const habitatTypes = ["po wyrębie", "porolna", "łąka"]
        
    

    function handleChange(event){
        if(choiceList.length === 3) {
            choiceList.pop()
        }
        var choice;


        switch(event.target.value){
            case 'po wyrębie':
                choice = {tag: 'after felling', value: event.target.value}
                break
            case 'porolna':
                choice = {tag : 'post-agricultural', value: event.target.value}
                break
            case 'łąka':
                choice = {tag : 'meadow', value: event.target.value}
                break
        }

        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }
    return (
        <div className='bg'>
            <div className="centerdiv">
                <h2>Rodzaj podłoża:</h2>
                <form>
                    {habitatTypes.map(element => (
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
                        pathname: '/dominant',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
            </div>
        </div>
    )
}
