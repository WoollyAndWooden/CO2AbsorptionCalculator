import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'

export default function DominantSpecies() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const inputRef = useRef()
    const treeTypes = [
        "dąb szypułkowy i bezszypułkowy (Quercus robus Q. petraea)",
        "grab pospolity (Carpinus betulus)",
        "buk pospolity (Fagus sylvatica)",
        "lipa drobnolistna (Tilia cordata)",
        "jesion wyniosły (Fraxinus excelsior)",
        "klon pospolity (Acer platanoides)",
        "klon jawor (Acer pseudoplatanus)",
        "klon polny (Acer campestre)",
        "gatunki uzupełniające i krzewy"
    ]

    function handleChange(event){
            const { value } = event.target;
            console.log(value)

            if(selectedOptions.length >= 3) {
                alert("Możesz wybrać maksymalnie trzy gatunki!")
                return
            }
            if(selectedOptions.includes(value)) {
                console.log("include")
                setSelectedOptions(selectedOptions.filter((v) => v !== value))
            } else {
                console.log("NONONON")
                setSelectedOptions([...selectedOptions, value])
            }
    }
    
    function addToChoiceList() {
        const newList = choiceList.push(selectedOptions)
        setChoiceList(newList)
    }


    return (
        <div className='bg'>
            <div className="centerdiv">
                <h2>Dominujące Gatunki, wybierz maksymalnie trzy:</h2>
                <form>
                    {treeTypes.map((element, index) => (
                        <div>
                            <label>
                                <input 
                                ref={inputRef}
                                name={element}
                                type="radio"
                                key={index}
                                value={element} 
                                checked={selectedOptions.includes(element)}
                                onChange={(event) => handleChange(event)}
                                />
                                {element}
                            </label>
                        </div>
                    ))}
                    <Link onClick={addToChoiceList} to={{
                        pathname: '/percentages',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
                <Button onClick={() => {setSelectedOptions([]);}}>Reset</Button>
            </div>
        </div>
    )
}
