import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom'

export default function DominantSpeciesPage() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const [selected, setSelected] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const inputRef = useRef()


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        axios
          .get('http://localhost:8080/api/dominantSpecies/all')
          .then(response => {
            setData(response.data);
            setLoading(false);
          })  
          .catch(error => console.log(error));
      });    function handleChange(event){
        setSelected(true)
        if(choiceList.length === 3) {
            choiceList.pop()
        }
        const newList = choiceList.concat({value: event.target.value})
        setChoiceList(newList)
    }

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
        const lele = choiceList.push(newList)
        setChoiceList(lele)
      }
      
      function goToAnotherPage(event) {

        let newList = [...selectedOptions]

        if(newList.length === 0) {
            alert("Nie została wybrana żadna opcja!")
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
            <div className="centerdiv fade-in">
                <h2>Wybierz max. 3 gatunki</h2>
                <form>
                    {data && data.map((element, index) => (
                        <div>
                            <label>
                                <input
                                className='radio'  
                                ref={inputRef}
                                name={element.species}
                                type="checkbox"
                                key={index}
                                value={element.species} 
                                checked={selectedOptions.includes(element.species)}
                                onChange={(event) => handleChange(event)}
                                />
                                {element.species}
                            </label>
                        </div>
                    ))}
                    
                </form>
                <div className='forlink'>
                <Link className='endlink' to={{
                            pathname: '/groundtype',
                            state: {
                                state: choiceList
                            }
                        }}>Wróć</Link>
                <Link className='link' onClick={goToAnotherPage} to={{
                        pathname: '/percentages',
                        state: {
                            state: choiceList,
                        }
                    }}>Dalej</Link>

                </div>
                
            </div>
        </body>
    )
}
