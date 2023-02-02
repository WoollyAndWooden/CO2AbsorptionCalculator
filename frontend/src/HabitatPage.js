import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function HabitatPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const habitatTypes = [
        ["Alder", "Ribeso nigiri-Alnetum", "Ols porzeczkowy"],
        ["Swamp-birch", "Thelypteridi-Betuletum pubescentis", "Subborealna brzezina bagienna"],
        ["Swamp-oak", "Carici elongatae-Quercetum", "Dębiak turzycowy"],
        ["Ash-alder", "Fraxino-Alnetum", "Łęg jesionowo - olsowy"],
        ["Mesic lime-oak-hornbeam", "Tilio-Carpinetum mesic", "Grąd subkontynentalny suchy"],
        ["Moist lime-oak-hornbeam", "Tilio-Carpinetum moist", "Grąd subkontynentalny wilgotny"],
        ["Oak-pine", "Querco roboris-Pinetum", "Kontynentalny bór mieszany "],
        ["Oak-spruce", "Querco-Piceetum", "Subborealny bór mieszany "],
        ["Thermophilous oak", "Potentillo albae-Quercetum", "Świetlista dąbrowa subkontynentalna"],
        ["Mesic pine", "Peucedano-Pinetum", "Kontynentalny bór sosnowy świeży "],
        ["Moist pine", "Molinio-Pinetum", "Bór sosnowy wilgotny "],
        ["Boreal spruce", "Sphagno girgensohnii-Piceetum", "Borealna świerczyna na torfie"],
    ]

    function handleChange(event){
        setSelected(true)
        if(choiceList.length === 4) {
            choiceList.pop()
        }

        const newList = choiceList.concat({value: event.target.value})
        setChoiceList(newList)
    }

    function goToAnotherPage(event) {
        if(!isSelected) {
            event.preventDefault()
        }
    }

    return (
        <body>
            <div className="centerdiv">
                <h2>Siedlisko:</h2>
                <form>
                    {habitatTypes.map(element => (
                        <div>
                            <label>
                                <input
                                className='radio' 
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

                    <div className='forlink'>
                    <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/degree',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                    </div>
                </form>
            </div>
        </body>
    )
}