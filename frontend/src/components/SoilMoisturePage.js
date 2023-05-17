import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function getSoilMoistureChoice(value) {
    let tag = ''
    switch(value){
        case 'Bagienna':
            tag = 'swamp'
            break
        case 'Podmokła':
            tag = 'wet'
            break
        case "Wilgotna":
            tag = 'moist'
            break
        case "Pół wilgotna":
            tag = 'half-moist'
            break
        case "Sucha":
            tag = 'dry'
            break
    }
    return {tag: tag, value: value}


}

export default function SoilMoisturePage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)
    const inputRef = useRef()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
          .get('http://localhost:8080/api/soilMoisture/all')
          .then(response => {
            setData(response.data);
            setLoading(false);
          })  
          .catch(error => console.log(error));
      });

      

    function handleChange(event){
        setSelected(true)
        if(choiceList[0].tag === 'mature') {
            if(choiceList.length === 6) {
                choiceList.pop()
            }
        } else {
            if(choiceList.length === 7) {
                choiceList.pop()
            }
        }
        const value = event.target.value
        const choice = getSoilMoistureChoice(value)
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
                <h2>Wilgotność gleby:</h2>
                <form>
                    {data && data.map(element => (
                        <div>
                            <label>
                                <input
                                className='radio' 
                                ref={inputRef}
                                name="radiobutton"
                                type="radio"
                                key={element.soil} 
                                value={element.soil}
                                onClick={(event) => handleChange(event)} 
                                />
                                {element.soil}
                            </label>
                        </div>
                    ))}

                    <div className='forlink'>
                    {choiceList[0].tag ==='mature' ? (
                        <Link className='endlink' to={{
                            pathname: '/degree',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link> 

                    ) : (
                        <Link className='endlink' to={{
                            pathname: '/howmanytrees',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link> 
                    )}
                    
                    <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/reservoir',
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
