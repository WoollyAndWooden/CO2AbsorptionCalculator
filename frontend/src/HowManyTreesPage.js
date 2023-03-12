import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function HowManyTreesPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)    
    const inputRef = useRef()
    const habitatTypes = ["800 - 1200", "1200 - 1800"]
    

    function handleChange(event){
        setSelected(true)
        if(choiceList.length === 6) {
            choiceList.pop()
        }


        const newList = choiceList.concat({value:event.target.value})
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
            <div className="centerdiv">
                <h2>Ilość sadzonek na ha:</h2>
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
                            pathname: '/percentages',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/soil',
                        state: {
                            state: choiceList,
                        }
                    }}>Dalej</Link>
                </div>
            </div>
        </body>
    )
}
