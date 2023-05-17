import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../css/page.css'
import axios from 'axios'

export function getChoiceValue(value) {
    return {value: value}
}

export default function AverageAgePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        axios
          .get('http://localhost:8080/api/averageAge/all')
          .then(response => {
            setData(response.data);
            setLoading(false);
          })  
          .catch(error => console.log(error));
      });

    function handleChange(event){
        setSelected(true)
        if(choiceList.length === 3) {
            choiceList.pop()
        }
        const value = event.target.value
        const newList = choiceList.concat(getChoiceValue(value))
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
                <h2>Średni wiek lasu:</h2>
                <form>
                    {data && data.map(element => (
                        <div>
                            <label>
                                <input
                                className='radio' 
                                ref={inputRef}
                                name="radiobutton"
                                type="radio"
                                key={element.ageInterval} 
                                value={element.ageInterval}
                                onClick={(event) => handleChange(event)} 
                                />
                                {element.ageInterval}
                            </label>
                        </div>
                    ))}
                  
                </form>
                <div className='forlink'>
                <Link className='endlink' to={{
                            pathname: '/area',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/habitat',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                </div>
                
            </div>
        </body>
    )
}