import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function MaslPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const inputRef = useRef()
    const landforms = ["Niziny", "Wyżyny", "Góry"]
    const descriptions = [
        "Niziny - Obszary o wysokości bezwzględnej do 300 m n.p.m.",
        "Wyżyny - Obszary o wysokości powyżej 300 m n.p.m. i wysokościach względnych nieprzekraczających 300 m.",
        "Góry - Obszary o wysokości powyżej 300 m n.p.m. i różnicach wysokości względnych powyżej 300 m."
    ]
    const [description, setDescription] = useState("")


    function handleChange(event){
        if(choiceList.length === 8) {
            choiceList.pop()
        }
        const value = event.target.value
        var choice;
        var i = 0
        switch(value){
            case 'Niziny':
                choice = {tag: 'lowlands', value: value}
                i = 0
                break
            case 'Wyżyny':
                choice = {tag : 'highlands', value: value}
                i = 1
                break
            case 'Góry':
                choice = {tag : 'mountains', value: value}
                i = 2
                break
        }

        const newList = choiceList.concat(choice)
        setChoiceList(newList)
        setDescription(descriptions[i])
    }

    return (
        <div className='bg'>
            <div className="centerdiv">
                <h2>Wysokość n.p.m:</h2>
                <form>
                {landforms.map(element => (
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
                    <div>{description}</div>
                    <Link className='link' to={{
                        pathname: '/season',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
            </div>
        </div>
    )
}
