import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function WaterReservoirPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
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
        var choice;
        switch(value){
            case 'Są':
                choice = {tag: 'present', value: value}
                break
            case 'Brak':
                choice = {tag : 'absent', value: value}
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
            <div className="centerdiv">
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
