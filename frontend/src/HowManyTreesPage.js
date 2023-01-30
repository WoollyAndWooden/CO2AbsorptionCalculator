import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function HowManyTreesPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const habitatTypes = ["800 - 1200", "1200 - 1800"]
    

    function handleChange(event){
        if(choiceList.length === 4) {
            choiceList.pop()
        }


        const newList = choiceList.concat({value:event.value})
        setChoiceList(newList)
    }

    return (
        <div className='bg'>
            <div className="centerdiv">
                <h2>ilość sadzonek na ha:</h2>
                {console.log(choiceList)}
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
