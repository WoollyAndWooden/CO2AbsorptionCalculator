import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function CheckPage() {

    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state)
    const buttonRef = useRef(null);

    function callApi() {
        fetch('http://localhost:8080/calculate', { method: 'GET' })
          .then(data => data.json()) // Parsing the data into a JavaScript object
          .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
        }
    
    return (
    <div>
        <div className="centerdiv">
            <h2>Wybrane Opcje:</h2>
            <form className='next'>
                <div className='column'>
                    <label>Las</label>
                    <label>Pole powierzchni</label>
                    <label>Wiek</label>
                    <label>Siedlisko</label>
                    <label>Stopień</label>
                    <label>Gleba</label>
                    <label>Rezerwy Wody</label>
                    <label>Ukształtowanie terenu</label>
                    <label>Lokacja</label>
                </div>
                <div className='column'>
                {choiceList.map(element => (
                    <div >
                        <div>{element.value}</div>
                    </div>             
                ))}
                </div>
            </form>
            
            <button ref={buttonRef} onClick={callApi}>Oblicz</button>
                {console.log(choiceList)}

                <Link to={{
                        pathname: '/',
                    }}>Wróć do początku</Link>
        </div>
    </div>
  )
}
