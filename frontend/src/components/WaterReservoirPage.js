import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function getWaterReservoirChoice(value) {
    let tag = ''
    switch(value){
        case 'Są':
            tag = 'present'
            break
        case 'Brak':
            tag = 'absent'
            break
    }

    return {tag: tag, value: value}
    
}

export default function WaterReservoirPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)    
    const inputRef = useRef()

    function handleChange(event){
        setSelected(true)
        if(choiceList[0].tag === 'mature') {
            if(choiceList.length === 7) {
                choiceList.pop()
            }
        } else {
            if(choiceList.length === 8) {
                choiceList.pop()
            }
        }
        const value = event.target.value
        const choice = getWaterReservoirChoice(value)
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
                <h2>Zbiorniki wodne: </h2>
                <form>
                    <div>
                        <label>
                            <input
                            className='radio'  
                            ref={inputRef}
                            name="radiobutton"
                            type="radio"
                            key="Są" 
                            value="Są"
                            onClick={(event) => handleChange(event)} 
                            />
                            Są
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                            className='radio'  
                            ref={inputRef}
                            name="radiobutton"
                            type="radio"
                            key="Brak"
                            value="Brak"
                            onClick={(event) => handleChange(event)} 
                            />
                            Brak
                        </label>
                    </div>
                    
                </form>

                <div className='forlink'>
                <Link className='endlink' to={{
                            pathname: '/soil',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/masl',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                </div>

                
            </div>
        </body>
    )
}
