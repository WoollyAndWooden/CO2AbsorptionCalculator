import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function GroundTypePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)  
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const inputRef = useRef()
    const habitatTypes = ["po wyrębie", "porolna", "łąka"]
        
    

    function handleChange(event){
        setSelected(true)
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

    function goToAnotherPage(event) {
        if(!isSelected) {
            alert("Nie została wybrana żadna opcja!")
            event.preventDefault()
        }
    }
    return (
        <body>
            <div className="centerdiv fade-in">
                <h2>Rodzaj podłoża:</h2>
                <form>
                    {habitatTypes.map(element => (
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
                <Link className='endlink' to={{
                            pathname: '/area',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/dominant',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                </div>

                
            </div>
        </body>
    )
}
