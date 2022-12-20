import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function HabitatPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const habitatTypes = [
        ["Alder", "Ribeso nigiri-Alnetum", "Ols porzeczkowy"],
        ["Swamp-birch", "Thelypteridi-Betuletum pubescentis", "Subborealna brzezina bagienna"],
        ["Swamp-oak", "Carici elongatae-Quercetum", "Dębiak turzycowy"]
    ]

    function handleChange(event){
        if(choiceList.length === 4) {
            choiceList.pop()
        }

        const newList = choiceList.concat({value: event.target.value})
        setChoiceList(newList)
    }

    return (
        <div>
            <div className="centerdiv">
                <h2>Siedlisko:</h2>
                <form>
                    {habitatTypes.map(element => (
                        <div>
                            <label>
                                <input
                                    ref={inputRef}
                                    name="radiobutton"
                                    type="radio"
                                    key={element[0]}
                                    value={element[0]}
                                    onClick={(event) => handleChange(event)}
                                />
                                {element[0]} ({element[1]})/{element[2]}
                            </label>
                        </div>
                    ))}
                    <Link to={{
                        pathname: '/degree',
                        state: {
                            state: choiceList
                        }
                    }}>Oblicz</Link>
                </form>
            </div>
        </div>
    )
}