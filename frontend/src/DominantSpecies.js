import React, { useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'

export default function DominantSpecies() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [selected, setSelected] = useState(false)
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

            let newList;
            if(selectedOptions.includes(value)) {
                newList = selectedOptions.filter(v => v !== value)
                setSelectedOptions(newList)
            } else {
                if(selectedOptions.length >= 3) {
                    return
                }
                newList = [...selectedOptions, value]
                setSelectedOptions(newList)
            }
            checkSelected(newList)
    }

    function checkSelected(newList) {
        if(newList.length > 0) {
            setSelected(true)
        } else {
            setSelected(false)
        }
    }
    
    function addToChoiceList(newList) {
        console.log(newList)
        const lele = choiceList.push(newList)
        setChoiceList(lele)
      }
      
      function goToAnotherPage(event) {

        let newList = [...selectedOptions]
        console.log(newList)

        if(newList.length === 0) {
            alert("Nie wybrałeś żadnej opcji!")
            event.preventDefault()
            return
        }
        if (selectedOptions.length < 3) {
          let missing = [];
          for (let index = 0; index < 3 - selectedOptions.length; index++) {
            missing.push("brak");
          }
        newList = [...selectedOptions, ...missing]
        setSelectedOptions(newList)
        }
        addToChoiceList(newList);
      }
    
    
    return (
        
        <body>
            {checkSelected}
            <div className="centerdiv">
                <h2>Wybierz max. 3 gatunki</h2>
                <form>
                    {treeTypes.map((element, index) => (
                        <div>
                            <label>
                                <input
                                className='radio'  
                                ref={inputRef}
                                name={element}
                                type="checkbox"
                                key={index}
                                value={element} 
                                checked={selectedOptions.includes(element)}
                                onChange={(event) => handleChange(event)}
                                />
                                {element}
                            </label>
                        </div>
                    ))}
                    
                </form>
                <div className='forlink'>
                <Link className='link' onClick={goToAnotherPage} to={{
                        pathname: '/percentages',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                </div>
                
            </div>
        </body>
    )
}
