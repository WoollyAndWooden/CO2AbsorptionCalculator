import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function GrowingSeasonPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)    

    const inputRef = useRef()

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        axios
          .get('http://localhost:8080/api/location/all')
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
        setSelected(true)
        if(choiceList[0].tag === 'mature') {
            if(choiceList.length === 9) {
                choiceList.pop()
            }
        } else {
            if(choiceList.length === 10) {
                choiceList.pop()
            }
        }
        const value = event.target.value
        var choice = {value: value}
    
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
                <h2>Lokacja</h2>
                <form>
                    {data && data.map(element => (
                        <div>
                            <label>
                                <input
                                className='radio'  
                                ref={inputRef}
                                name="radiobutton"
                                type="radio"
                                key={element.name} 
                                value={element.name}
                                onClick={(event) => handleChange(event)} 
                                />
                                {element.name}
                            </label>
                        </div>
                    ))}
                    
                </form>

                <div className='forlink'>
                <Link className='endlink' to={{
                            pathname: '/masl',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: choiceList[0].tag === 'mature' ? '/check-mature' : '/check-young',
                        state: {
                            state: choiceList
                        }
                    }}>Oblicz</Link>

                </div>

                
            </div>
        </body>
    )
}
