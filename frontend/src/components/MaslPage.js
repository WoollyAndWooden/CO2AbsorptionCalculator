import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function getMaslChoice(value) {
    let tag = ''
    let i = 0
    switch(value){
        case 'Niziny':
            tag = 'lowlands'
            i = 0
            break
        case 'Wyżyny':
            tag = 'highlands'
            i = 1
            break
        case 'Góry':
            tag = 'mountains'
            i = 2
            break
    }

    return [{tag: tag, value: value}, i]
}

export default function MaslPage() {
    const location = useLocation()
    const [choiceList, setChoiceList] = useState(location.state.state.concat(0))
    const [isSelected, setSelected] = useState(false)    

    const inputRef = useRef()
    const [description, setDescription] = useState("")

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
          .get('http://localhost:8080/api/masl/all')
          .then(response => {
            setData(response.data);
            setLoading(false);
          })  
          .catch(error => console.log(error));
      });


    function handleChange(event){
        setSelected(true)
        if(choiceList[0].tag === 'mature') {
            if(choiceList.length === 8) {
                choiceList.pop()
            }
        } else {
            if(choiceList.length === 9) {
                choiceList.pop()
            }
        }
        const value = event.target.value
        const [choice, i] = getMaslChoice(value)
        const newList = choiceList.concat(choice)
        setChoiceList(newList)
        setDescription(data[i].description)
    }

    function goToAnotherPage(event) {
        if(!isSelected) {
            alert("Nie została wybrana żadna opcja!")
            event.preventDefault()
        }
    }

    return (
        <body>
            <div className="centerdiv fade-in">
                <h2>Wysokość n.p.m:</h2>
                <form>
                {data && data.map(element => (
                        <div>
                            <label>
                                <input
                                className='radio'  
                                ref={inputRef}
                                name="radiobutton"
                                type="radio"
                                key={element.landForm} 
                                value={element.landForm}
                                onClick={(event) => handleChange(event)} 
                                />
                                {element.landForm}
                            </label>
                        </div>
                    ))}
                    <div>{description}</div>
                    
                </form>
                <div className='forlink'>
                <Link className='endlink' to={{
                            pathname: '/reservoir',
                            state: {
                                state: choiceList.slice(0, -2)
                            }
                        }}>Wróć</Link>
                <Link onClick={goToAnotherPage} className='link' to={{
                        pathname: '/season',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>

                </div>
                
            </div>
        </body>
    )
}
