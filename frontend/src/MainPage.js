import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './css/page.css'

export default function MainPage() {

    const [choiceList, setChoiceList] = useState(['mature'])
    const inputRef = useRef()

    function addChoice(event) {
        choiceList.pop()

        let choice;
        if(event.target.value === 'Dojrzałe') {
            choice = 'mature'
        } else {
            choice = 'young'
        }
        const newList = choiceList.concat(choice)

        setChoiceList(newList)
    }

    return (
        <div>
            <div className="centerdiv">
                <h2>Chcę obliczyć wielkość akumulacji CO2 przez:</h2>
                <form>
                    <select  onChange={addChoice}>
                        <option value="Dojrzałe" ref={inputRef}>Dojrzałe lasy</option>
                        <option value="Młode" ref={inputRef}>Młode lasy </option>
                    </select>
                    <label>wiek lasu</label>
                    <Link to={{
                        pathname: '/area',
                        state: {
                            state: choiceList
                        }
                    }}>Dalej</Link>
                </form>
            </div>
        </div>
    )
}