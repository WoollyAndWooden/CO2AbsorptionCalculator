import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/page.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function getForestTypeChoice(value) {
    let tag;
    if(value === 'Dojrzałe lasy') {
        tag = 'mature'
    } else {
        tag = 'young'
    }
    return {tag: tag, value:value}
}

export default function MainPage() {

    const [choiceList, setChoiceList] = useState([{tag: 'mature', value: 'Dojrzałe lasy'}])
    const options = [{tag: 'mature', value: 'Dojrzałe lasy'}, {tag: 'young', value: 'Młode lasy'}]
    const inputRef = useRef()

    function addChoice(event) {
        choiceList.pop()
        const value = event.target.value
        let choice = getForestTypeChoice(value)
        const newList = choiceList.concat(choice)
        setChoiceList(newList)
    }

    return (
        <body>
            <div className="centerdiv fade-in">
                <h2>Chcę obliczyć wielkość akumulacji CO2 przez:</h2>
                <form>
                    <select  onChange={addChoice} aria-label="Wybierz wiek lasu" >
                        {options.map((option, index) => {
                            return <option key={index} value={option.value} ref={inputRef}>{option.value}</option>
                        })}
                    </select>
                    <label className='label'>wiek lasu</label>
                </form>
                
                <div className='forlink'>
                    <Link className='link' to={{
                            pathname: '/area',
                            state: {
                                state: choiceList
                            }
                        }}>Dalej</Link>
                </div>
            </div>
        </body>
    )
}