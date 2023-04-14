import React from 'react'
import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

export function getDegreeChoice(value) {
    let percentage = 0

    switch(value) {
        case 'Naturalne':
            percentage = 1
            break;
        case 'O znamionach siedlisk naturalnych':
            percentage = 0.8
            break;
        case 'Półnaturalne':
            percentage = 0.5
            break;
    }
    return {percentage: percentage, value: value}
}

export default function DegreePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios
        .get('http://localhost:8080/api/degree/all')
        .then(response => {
          setData(response.data);
          setLoading(false);
        })  
        .catch(error => console.log(error));
    });

    function handleChange(name, percentage){
        setSelected(true)
        if(choiceList.length === 5) {
            choiceList.pop()
        }
        let choice = {percentage: percentage, value: name}
        console.log(choice)

        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    function goToAnotherPage(event) {
        if(!isSelected) {
            alert("Nie została wybrana żadna opcja!")
            event.preventDefault()
        }
    }

    if (loading) {
        return (
          <center>
            <h1>Loading....</h1>
          </center>
        )
      }

    return (
        <body>
            <div className="centerdiv fade-in">
                <h2>Stopień Naturalności:</h2>
                <form>
                    {data && data.map(element => (
                        <div>
                            <label className='contentValue  '>
                                <input
                                className='radio'  
                                ref={inputRef}
                                name="radiobutton"
                                type="radio"
                                key={element.name} 
                                value={element.name}
                                onClick={(event) => handleChange(element.name, element.value)} 
                                />
                                {element.name}
                            </label>
                        </div>
                    ))}
                    <div className='forlink'>
                    <Link className='endlink' to={{
                            pathname: '/habitat',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                    <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/soil',
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
